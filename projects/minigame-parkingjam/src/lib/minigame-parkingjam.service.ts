import { Injectable } from '@angular/core';
import { MinigameParkingjamCar } from './shared/minigame-parkingjam-car.model';
import { MinigameParkingjamWall } from './shared/minigame-parkingjam-wall.model';
import { MinigameParkingjamImagesService } from './minigame-parkingjam-images.service';

@Injectable({
  providedIn: 'root'
})
export class MinigameParkingjamService {
  prefix: string = "";
  public width: number = -1;
  public height: number = -1;

  private walls: MinigameParkingjamWall[] = [];
  private cars: MinigameParkingjamCar[] = [];
  private movingCar: MinigameParkingjamCar | undefined;
  private _moves: number = 0;

  public get moves(): number { return this._moves; }
  
  private _completionCallback!: () => void;

  constructor(private imageService: MinigameParkingjamImagesService) { }

  public set completionCallback(callback: () => void) {
    this._completionCallback = callback;
  }

  public setupComplete() {
    this._moves = +(localStorage.getItem(this.prefix + '_moves') ?? "0");
  }

  addCar(car: MinigameParkingjamCar) {
    car.mapToGrid();
    this.cars.push(car);
  }

  addWall(wall: MinigameParkingjamWall) {
    this.walls.push(wall);
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  setContext(ctx: CanvasRenderingContext2D) {
    this.walls.forEach(w => w.ctx = ctx);
    this.cars.forEach(c => {
      c.ctx = ctx;
      c.service = this;
      c.imageService = this.imageService;
    });
  }

  startMoving(car: MinigameParkingjamCar): void {
    let index = this.cars.indexOf(car);
    this.cars.splice(index, 1);
    this.movingCar = car;
  }

  rangeForMovement(): number[] {
    if (this.movingCar) {
      let minBound = -10;
      // +10 because if there is no wall at the side of the board, the car must be able to leave it.
      let maxBound = (this.movingCar.vertical ? this.height : this.width) + 10;
      let indices = this.movingCar.vertical ? this.movingCar.lines() : this.movingCar.columns();
      this.findCarsOnTheWay(this.movingCar)
        .flatMap(c => (this.movingCar?.vertical) ? c.lines() : c.columns())
        .concat(this.findWallsOnTheWay(this.movingCar))
        .forEach(i => {
          if (indices[0] > i) minBound = Math.max(minBound, i);
          else maxBound = Math.min(maxBound, i);
        });
      
      return [minBound + 1, maxBound - this.movingCar.size];
    }

    return [0, 0];
  }

  findWallsOnTheWay(movingCar: MinigameParkingjamCar): number[] {
    let w = this.walls
    .filter(w => w.vertical != movingCar.vertical && this.hasSameIndex(w, movingCar))
    .map(w => this.extractIndexOfTheWall(w, movingCar));
    return w;
  }

  hasSameIndex(wall: MinigameParkingjamWall, car: MinigameParkingjamCar): boolean {
    return (car.vertical) ? (wall.columnFrom <= car.column && wall.columnTo > car.column)
      : (wall.lineFrom <= car.line && wall.lineTo > car.line);
  }

  // Determine on which side of the wall the car is located.
  extractIndexOfTheWall(wall: MinigameParkingjamWall, car: MinigameParkingjamCar): number {
    if (car.vertical) {
      let wallLine = wall.lineFrom;
      return (car.line >= wallLine) ? wallLine - 1 : wallLine;
    } else {
      let wallCol = wall.columnFrom;
      return (car.column >= wallCol) ? wallCol - 1 : wallCol;
    }
  }

  private findCarsOnTheWay(car: MinigameParkingjamCar): MinigameParkingjamCar[] {
    return this.cars
      .filter(c => {
        if (car.vertical) {
          return c.columns().indexOf(car.column) >= 0;
        } else {
          return c.lines().indexOf(car.line) >= 0;
        }
      });
  }

  movementComplete(): void {
    if (this.movingCar) {
      this.increaseAndStoreMoves();
      console.log(`${this.movingCar.line}-${this.movingCar.column} (${this.movingCar.size}) (${this.width} ${this.height})`);
      if (this.isOut(this.movingCar)) {
        this.movingCar.wentOut();
        this.movingCar.store(this.prefix);
        console.log("car is out");
      } else {
        this.movingCar.store(this.prefix);
        this.cars.push(this.movingCar);
        this.movingCar = undefined;
      }

      if (this.isCompleted()) {
        this._completionCallback();
      }
    }
  }

  private isOut(car: MinigameParkingjamCar): boolean {
    if (car.vertical) {
      return car.line < 0 || (car.line + car.size) > this.height;
    } else {
      return car.column < 0 || (car.column + car.size) > this.width;
    }
  }

  private isCompleted(): boolean {
    return this.cars
      .filter(c => c.required)
      .filter(c => !c.isOut())
      .length === 0;
  }

  getCarForPosition(x: number, y: number): MinigameParkingjamCar | undefined {
    let filtered = this.cars.filter(c => c.isPositionOnCar(x, y));
    return (filtered.length === 1) ? filtered[0] : undefined;
  }

  drawBoard() {
    this.walls.forEach(w => w.draw());
  }

  drawCars() {
    this.cars.forEach(c => c.draw());
  }

  loadCars(scenarioId: string): MinigameParkingjamCar[] {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(scenarioId))
      .filter(k => k.search('_car_id') > -1)
      .map(k => {
        let id = localStorage.getItem(k);
        return (id) ? +id : 0;
      })
      .filter(id => id != 0)
      .map(id => {
        let car = new MinigameParkingjamCar(id).load(scenarioId);
        car.service = this;
        car.imageService = this.imageService;
        return car.load(scenarioId);
      });
  }

  loadWalls(scenarioId: string): MinigameParkingjamWall[] {
    return Object.keys(localStorage)
    .filter(k => k.startsWith(scenarioId))
    .filter(k => k.search('_wall_id') > -1)
    .map(k => {
      let id = localStorage.getItem(k);
      return (id) ? +id : 0;
    })
    .filter(id => id != 0)
    .map(id => {
      let wall = new MinigameParkingjamWall(id);
      return wall.load(scenarioId)
    });
  }

  private increaseAndStoreMoves(): void {
    this._moves++;
    localStorage.setItem(this.prefix + '_moves', '' + this._moves);
  }

  store(): void {
    localStorage.setItem(this.prefix + '_moves', '' + this._moves);
    this.walls.forEach(w => w.store(this.prefix));
    this.cars.forEach(c => c.store(this.prefix));
  }
}
