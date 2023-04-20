import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MinigameParkingjamService } from './minigame-parkingjam.service';
import { MinigameParkingjamWall } from './shared/minigame-parkingjam-wall.model';

@Component({
  selector: 'minigame-parkingjam',
  templateUrl: './minigame-parkingjam.component.html',
  styles: [
  ]
})
export class MinigameParkingjamComponent {
  @Input() prefix: string = "";
  @Output() completionEvent = new EventEmitter<boolean>();

  constructor(private service: MinigameParkingjamService) {
    this.service.setSize(5, 7);
    // Required for the callback in order to run in the right context (otherwise is the context of the caller, here the service)
    let that = this;
    this.service.completionCallback = (bonus: boolean) => { that.completionEvent.emit(bonus); };
  }
}
