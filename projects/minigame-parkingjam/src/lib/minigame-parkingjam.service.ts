import { Injectable } from '@angular/core';
import { MinigameParkingjamCar } from './shared/minigame-parkingjam-car.model';
import { MinigameParkingjamWall } from './shared/minigame-parkingjam-wall.model';
import { min } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinigameParkingjamService {
  public width: number = -1;
  public height: number = -1;

  private walls: MinigameParkingjamWall[] = [];
  private cars: MinigameParkingjamCar[] = [];
  private movingCar: MinigameParkingjamCar | undefined;
  
  private _completionCallback!: (bonus: boolean) => void;

  constructor() { }

  public set completionCallback(callback: (bonus: boolean) => void) {
    this._completionCallback = callback;
  }

  addCar(car: MinigameParkingjamCar) {
    this.cars.push(car);
  }

  addWall(wall: MinigameParkingjamWall) {
    this.walls.push(wall);
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  startMoving(car: MinigameParkingjamCar): void {
    let index = this.cars.indexOf(car);
    this.cars.splice(index, 1);
    this.movingCar = car;
  }

  rangeForMovement(): number[] {
    if (this.movingCar) {
      let minBound = -10;
      // +1 because if there is no wall at the side of the board, the car must be able to leave it.
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
      if (this.isOut(this.movingCar)) {
        this.movingCar.wentOut();
      } else {
        this.cars.push(this.movingCar);
        this.movingCar = undefined;
      }

      if (this.isCompleted()) {
        this._completionCallback(false);
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
}
