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
    //this.service.load(this.ctx!);

    this.service.drawBoard();
    this.service.drawCars();
    this.captureEvent();
  }

  // private generateScenario() {
  //   if (this.ctx) {
  //     // left wall
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, true, 0, 1, 0, 0));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, true, 1, 2, 0, 0));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, true, 2, 3, 0, 0));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, true, 3, 4, 0, 0));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, true, 4, 5, 0, 0));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, true, 5, 6, 0, 0));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, true, 6, 7, 0, 0));
  //     // right wall
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, true, 0, 1, 5, 5));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, true, 1, 2, 5, 5));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, true, 2, 3, 5, 5));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, true, 3, 4, 5, 5));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, true, 4, 5, 5, 5));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, true, 6, 7, 5, 5));
  //     // upper wall
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, false, 0, 0, 0, 1));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, false, 0, 0, 1, 2));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, false, 0, 0, 2, 3));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, false, 0, 0, 3, 4));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, false, 0, 0, 4, 5));
  //     // lower wall
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, false, 7, 7, 0, 1));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, false, 7, 7, 1, 2));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, false, 7, 7, 2, 3));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, false, 7, 7, 3, 4));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, false, 7, 7, 4, 5));
  //     // inner walls
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, false, 1, 1, 1, 2));
  //     this.service.addWall(new MinigameParkingjamWall(this.ctx, false, 3, 3, 4, 5));

  //     let car1 = new MinigameParkingjamCar(this.ctx, this.service, 1);
  //     car1.line = 5;
  //     car1.column = 0;
  //     car1.size = 2;
  //     car1.vertical = false;
  //     car1.required = true;
  //     car1.mapToGrid();
  //     car1.draw();
  //     this.service.addCar(car1);
  //     let car2 = new MinigameParkingjamCar(this.ctx, this.service, 2);
  //     car2.line = 2;
  //     car2.column = 1;
  //     car2.size = 3;
  //     car2.vertical = true;
  //     car2.color = "#00FFFF";
  //     car2.mapToGrid();
  //     car2.draw();
  //     this.service.addCar(car2);
  //     let car3 = new MinigameParkingjamCar(this.ctx, this.service, 3);
  //     car3.line = 3;
  //     car3.column = 2;
  //     car3.size = 3;
  //     car3.vertical = false;
  //     car3.color = "#0000FF";
  //     car3.mapToGrid();
  //     car3.draw();
  //     this.service.addCar(car3);
  //     let car4 = new MinigameParkingjamCar(this.ctx, this.service, 4);
  //     car4.line = 5;
  //     car4.column = 4;
  //     car4.size = 2;
  //     car4.vertical = true;
  //     car4.color = "#00FF00";
  //     car4.mapToGrid();
  //     car4.draw();
  //     this.service.addCar(car4);
  //   }
  //   this.service.drawBoard();
  // }

  private captureEvent(): void {
    let canvasEl = this.canvas.nativeElement;

    this.mousedown = fromEvent(canvasEl, 'mousedown');
    this.mouseup = fromEvent(document, 'mouseup');

    this.mousedownSubscription = this.mousedown.subscribe((res: any) => {
      let filtered = this.service.getCarForPosition(res.offsetX, res.offsetY);
      if (filtered) {
        this.movingCar = filtered;
        this.movingCar.onMouseClick(res.pageX, res.pageY);
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

    this.drawingSubscription = fromEvent(document, 'mousemove')
      .pipe(skipUntil(this.mousedown))
      .pipe(takeUntil(this.mouseup))
      .subscribe((res: any) => {
        if (this.movingCar) {
          this.movingCar.onMouseMove(res.pageX, res.pageY);
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
