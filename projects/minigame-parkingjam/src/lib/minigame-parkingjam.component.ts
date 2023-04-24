import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MinigameParkingjamService } from './minigame-parkingjam.service';
import { MinigameParkingjamCar } from './shared/minigame-parkingjam-car.model';
import { MinigameParkingjamWall } from './shared/minigame-parkingjam-wall.model';

@Component({
  selector: 'minigame-parkingjam',
  templateUrl: './minigame-parkingjam.component.html',
  styles: [
  ]
})
export class MinigameParkingjamComponent implements OnInit {
  @Input() prefix: string = "";
  @Input() width: number = 0;
  @Input() height: number = 0;
  @Input() cars: MinigameParkingjamCar[] = [];
  @Input() walls: MinigameParkingjamWall[] = [];
  @Output() completionEvent = new EventEmitter<boolean>();

  constructor(private service: MinigameParkingjamService) {}

  ngOnInit(): void {
    this.service.prefix = this.prefix;
    this.service.width = this.width;
    this.service.height = this.height;
    this.cars.forEach(c => this.service.addCar(c));
    this.walls.forEach(w => this.service.addWall(w));
    // Required for the callback in order to run in the right context (otherwise is the context of the caller, here the service)
    let that = this;
    this.service.completionCallback = (bonus: boolean) => { that.completionEvent.emit(bonus); };
  }
}
