import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { MinigameParkingjamCellstate } from '../shared/minigame-parkingjam-cellstate.model';
import { MinigameParkingjamService } from '../minigame-parkingjam.service';
import { MinigameParkingjamCar } from '../shared/minigame-parkingjam-car.model';
import { Subscription, fromEvent } from 'rxjs';
import { skipUntil, takeUntil } from 'rxjs/operators';
import { MinigameParkingjamWall } from '../shared/minigame-parkingjam-wall.model';
import { MinigameParkingjamConst } from '../shared/minigame-parkingjam-const.model';

@Component({
  selector: 'minigame-parkingjam-board',
  templateUrl: './minigame-parkingjam-board.component.html',
  styleUrls: ['./minigame-parkingjam-board.component.css']
})
export class MinigameParkingjamBoardComponent implements AfterViewInit, OnDestroy {
  @Input() prefix: string = "";
  @ViewChild('canvas') 
  canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  private ctx!: CanvasRenderingContext2D | null;

  private movingCar: MinigameParkingjamCar | null = null;

  private mousedown: any;
  private mouseup: any;
  private mousedownSubscription!: Subscription;
  private mouseupSubscription!: Subscription;
  private drawingSubscription!: Subscription;

  constructor(private service: MinigameParkingjamService) {}

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.service.prefix = this.prefix;
    this.service.setContext(this.ctx!);

    this.service.drawBoard();
    this.service.drawCars();
    this.captureEvent();
  }

  private captureEvent(): void {
    let canvasEl = this.canvas.nativeElement;

    this.mousedown = fromEvent(canvasEl, 'touchstart');
    this.mouseup = fromEvent(document, 'touchend');

    this.mousedownSubscription = this.mousedown.subscribe((res: any) => {
      res.preventDefault();
      let touch = res.touches[0];
      let filtered = this.service.getCarForPosition(touch.clientX - touch.target.offsetLeft, touch.clientY - touch.target.offsetTop);
      if (filtered) {
        this.movingCar = filtered;
        this.movingCar.onMouseClick(touch.pageX, touch.pageY);
      }
    });

    this.mouseupSubscription = this.mouseup.subscribe(() => {
      if (this.movingCar) {
        this.movingCar.onMouseRelease();
        this.service.drawBoard();
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

    this.drawingSubscription = fromEvent(document, 'touchmove')
      .pipe(skipUntil(this.mousedown))
      .pipe(takeUntil(this.mouseup))
      .subscribe((res: any) => {
        if (res.touches[0].target === canvasEl) {
          res.preventDefault();
        }
        if (this.movingCar) {
          this.movingCar.onMouseMove(res.touches[0].pageX, res.touches[0].pageY);
          this.service.drawBoard();
        }
      });
  }
  
  ngOnDestroy() {
    // this will remove event lister when this component is destroyed
    this.unsubscribe(this.mousedownSubscription);
    this.unsubscribe(this.mouseupSubscription);
    this.unsubscribe(this.drawingSubscription);
  }

  private unsubscribe(sub: Subscription) {
    if (sub) {
      sub.unsubscribe();
    }
  }
}
