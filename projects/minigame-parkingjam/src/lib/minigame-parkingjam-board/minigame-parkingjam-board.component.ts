import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MinigameParkingjamCellstate } from '../shared/minigame-parkingjam-cellstate.model';
import { MinigameParkingjamService } from '../minigame-parkingjam.service';
import { MinigameParkingjamCar } from '../shared/minigame-parkingjam-car.model';
import { Subscription, fromEvent } from 'rxjs';
import { skipUntil, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'minigame-parkingjam-board',
  templateUrl: './minigame-parkingjam-board.component.html',
  styleUrls: ['./minigame-parkingjam-board.component.css']
})
export class MinigameParkingjamBoardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') 
  canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  private ctx!: CanvasRenderingContext2D | null;

  private movingCar: MinigameParkingjamCar | null = null;

  private mousedown: any;
  private mouseup: any;
  private drawingSubscription!: Subscription;

  constructor(private parkingjamService: MinigameParkingjamService) {}

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.render();
    this.captureEvent();
  }

  private render(): void {
    if (this.ctx) {
      let car1 = new MinigameParkingjamCar(123, this.ctx, this.parkingjamService);
      car1.line = 3;
      car1.column = 5;
      car1.size = 3;
      car1.vertical = true;
      car1.mapToGrid();
      car1.draw();
      this.parkingjamService.cars.push(car1);
      let car2 = new MinigameParkingjamCar(456, this.ctx, this.parkingjamService);
      car2.line = 4;
      car2.column = 7;
      car2.size = 2;
      car2.vertical = false;
      car2.mapToGrid();
      car2.draw();
      this.parkingjamService.cars.push(car2);
    }
  }

  private captureEvent(): void {
    let canvasEl = this.canvas.nativeElement;

    this.mousedown = fromEvent(canvasEl, 'mousedown');
    this.mouseup = fromEvent(canvasEl, 'mouseup');

    this.mousedown.subscribe((res: any) => {
      let filtered = this.parkingjamService.getCarForPosition(res.offsetX, res.offsetY);
      if (filtered) {
        this.movingCar = filtered;
        this.movingCar.onMouseClick(res.offsetX, res.offsetY);
      }
    });

    this.mouseup.subscribe((res: any) => {
      if (this.movingCar) {
        this.movingCar.onMouseRelease();
        this.movingCar = null;
        this.captureMoveEvent(canvasEl);
      }
    });

    this.captureMoveEvent(canvasEl);
  }

  /*
   * Subscribe to the mouse move event. After each car move, this has to be unsubscribed und
   * re-subscribed in order to restart capturing the events.
   */
  private captureMoveEvent(canvasEl: HTMLCanvasElement) {
    if (this.drawingSubscription) {
      this.drawingSubscription.unsubscribe();
    }

    this.drawingSubscription = fromEvent(canvasEl, 'mousemove')
      .pipe(skipUntil(this.mousedown))
      .pipe(takeUntil(this.mouseup))
      .subscribe((res: any) => {
        if (this.movingCar) {
          this.movingCar.onMouseMove(res.offsetX, res.offsetY);
        }
      });
  }
  
  ngOnDestroy() {
    // this will remove event lister when this component is destroyed
    this.drawingSubscription.unsubscribe();
  }
}
