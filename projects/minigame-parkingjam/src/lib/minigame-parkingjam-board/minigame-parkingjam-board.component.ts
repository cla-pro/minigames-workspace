import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { MinigameParkingjamService } from '../minigame-parkingjam.service';
import { MinigameParkingjamCar } from '../shared/minigame-parkingjam-car.model';
import { MinigameCommonTouchService } from 'projects/minigame-common/src/public-api';

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

  constructor(private service: MinigameParkingjamService, private touchService: MinigameCommonTouchService) {
    let that = this;
    this.touchService.startCallback = (x, y) => that.startTouch(x, y);
    this.touchService.endCallback = () => that.endTouch();
    this.touchService.moveCallback = (x, y) => this.moveTouch(x, y);
  }

  ngAfterViewInit(): void {
    let nativ = this.canvas.nativeElement;
    this.touchService.trackMovementOn(nativ);
    this.ctx = nativ.getContext('2d');
    this.ctx!.clearRect(0, 0, nativ.width, nativ.height);
    this.service.prefix = this.prefix;
    this.service.setContext(this.ctx!);
    this.service.drawBoard();
    this.service.drawCars();
  }

  startTouch(x: number, y: number) {
    let filtered = this.service.getCarForPosition(x, y);
    if (filtered) {
      this.movingCar = filtered;
      this.movingCar.onMouseClick(x, y);
    }
  }

  endTouch() {
    if (this.movingCar) {
      this.movingCar.onMouseRelease();
      this.service.drawBoard();
      this.movingCar = null;
    }
  }

  moveTouch(x: number, y: number) {
    if (this.movingCar) {
      this.movingCar.onMouseMove(x, y);
      this.service.drawBoard();
    }
  }
  
  ngOnDestroy() {
    this.touchService.stopTracking();
  }
}
