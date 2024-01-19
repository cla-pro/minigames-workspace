import { Injectable } from '@angular/core';
import { Subscription, fromEvent, skipUntil, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinigameCommonTouchService {
  private mousedown: any;
  private mouseup: any;
  private mousedownSubscription!: Subscription;
  private mouseupSubscription!: Subscription;
  private mousemoveSubscription!: Subscription;
  
  private touchstart: any;
  private touchend: any;
  private touchstartSubscription!: Subscription;
  private touchendSubscription!: Subscription;
  private touchmoveSubscription!: Subscription;

  private initialPageX: number = -1;
  private initialPageY: number = -1;
  private initialLocalX: number = -1;
  private initialLocalY: number = -1;

  startCallback: (x: number, y: number) => void = () => {};
  endCallback: () => void = () => {};
  moveCallback: (x: number, y: number) => void = () => {};

  constructor() { }

  public trackMovementOn(canvas: HTMLCanvasElement) {
    this.mousedown = fromEvent(canvas, 'mousedown');
    this.touchstart = fromEvent(canvas, 'touchstart');
    this.mouseup = fromEvent(document, 'mouseup');
    this.touchend = fromEvent(document, 'touchend');

    this.mousedownSubscription = this.mousedown.subscribe((e: any) => { this.handleStart(e); });
    this.touchstartSubscription = this.touchstart.subscribe((e: any) => { this.handleStart(e); })

    this.mouseupSubscription = this.mouseup.subscribe((e: any) => { this.handleEnd(e, canvas); });
    this.touchendSubscription = this.touchend.subscribe((e: any) => { this.handleEnd(e, canvas); })

    this.captureMoveEvent(canvas);
  }

  public stopTracking() {
    // this will remove event lister when this component is destroyed
    this.unsubscribe(this.mousedownSubscription);
    this.unsubscribe(this.mouseupSubscription);
    this.unsubscribe(this.mousemoveSubscription);
    this.unsubscribe(this.touchstartSubscription);
    this.unsubscribe(this.touchendSubscription);
    this.unsubscribe(this.touchmoveSubscription);
  }

  private unsubscribe(sub: Subscription) {
    if (sub) {
      sub.unsubscribe();
    }
  }

  private handleStart(e: any): void {
    e.preventDefault();

    if (e.type == 'touchstart') {
      let touch = e.touches[0];
      this.initialPageX = touch.pageX;
      this.initialPageY = touch.pageY;
      this.initialLocalX = touch.clientX - touch.target.offsetLeft;
      this.initialLocalY = touch.clientY - touch.target.offsetTop;
      this.startCallback(this.initialLocalX, this.initialLocalY);
    } else {
      this.initialPageX = e.pageX;
      this.initialPageY = e.pageY;
      this.initialLocalX = e.clientX - e.target.offsetLeft;
      this.initialLocalY = e.clientY - e.target.offsetTop;
      this.startCallback(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop);
    }
  }

  private handleEnd(e: any, canvas: HTMLCanvasElement): void {
    e.preventDefault();

    this.initialPageX = -1;
    this.initialPageY = -1;
    this.initialLocalX = -1;
    this.initialLocalY = -1;

    this.endCallback();
    this.captureMoveEvent(canvas);
  }

  private captureMoveEvent(canvas: HTMLCanvasElement) {
    if (this.touchmoveSubscription) {
      this.touchmoveSubscription.unsubscribe();
    }

    if (this.mousemoveSubscription) {
      this.mousemoveSubscription.unsubscribe();
    }

    this.touchmoveSubscription = fromEvent(document, 'touchmove')
      .pipe(skipUntil(this.touchstart))
      .pipe(takeUntil(this.touchend))
      .subscribe((e: any) => {
        this.handleMove(e);
      });

    this.mousemoveSubscription = fromEvent(document, 'mousemove')
      .pipe(skipUntil(this.mousedown))
      .pipe(takeUntil(this.mouseup))
      .subscribe((e: any) => {
        this.handleMove(e);
      });
  }

  private handleMove(e: any) {
    e.preventDefault();

    if (e.type == 'touchmove') {
      let touch = e.touches[0];
      this.moveCallback(this.initialLocalX + touch.pageX - this.initialPageX, this.initialLocalY + touch.pageY - this.initialPageY);
    } else {
      this.moveCallback(this.initialLocalX + e.pageX - this.initialPageX, this.initialLocalY + e.pageY - this.initialPageY);
    }
  }
}
