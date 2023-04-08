import { Injectable } from '@angular/core';
import { MinigameParkingjamCar } from './shared/minigame-parkingjam-car.model';
import { MinigameParkingjamCellstate } from './shared/minigame-parkingjam-cellstate.model';
import { MinigameParkingjamPosition } from './shared/minigame-parkingjam-position.model';
import { Rectangle } from './shared/rectangle.model';

@Injectable({
  providedIn: 'root'
})
export class MinigameParkingjamService {
  private width: number = -1;
  private height: number = -1;
  cars: MinigameParkingjamCar[] = [];
  board: MinigameParkingjamCellstate[][] = [];
  movingCar: MinigameParkingjamCar | undefined;

  public setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.createBoard();
  }

  constructor() { }
  
  private createBoard() {
    for (let i = 0; i < this.height; i++) {
      let line: MinigameParkingjamCellstate[] = [];
      for (let j = 0; j < this.width; j++) {
        line.push(new MinigameParkingjamCellstate("EMPTY"));
      }
      this.board.push(line);
    }
  }

  startMoving(car: MinigameParkingjamCar): void {
    let index = this.cars.indexOf(car);
    this.cars.splice(index, 1);
    this.movingCar = car;
  }

  rangeForMovement(): number[] {
    if (this.movingCar) {
      let minBound = 0;
      let maxBound = this.movingCar.vertical ? this.height : this.width;
      let indices = this.movingCar.vertical ? this.movingCar.lines() : this.movingCar.columns();
      this.findCarsOnTheWay(this.movingCar)
        .flatMap(c => (this.movingCar?.vertical) ? c.lines() : c.columns())
        .forEach(i => {
          if (indices[0] > i) minBound = Math.max(minBound, i);
          else maxBound = Math.min(maxBound, i);
        });
      
      return [minBound == 0 ? minBound : minBound + 1, maxBound - this.movingCar.size];
    }

    return [0, 0];
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
      this.cars.push(this.movingCar);
      this.movingCar = undefined;
    }
  }

  getCarForPosition(x: number, y: number): MinigameParkingjamCar | undefined {
    let filtered = this.cars.filter(c => c.isPositionOnCar(x, y));
    return (filtered.length === 1) ? filtered[0] : undefined;
  }
}
