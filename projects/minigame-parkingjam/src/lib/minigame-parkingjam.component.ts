import { Component } from '@angular/core';
import { MinigameParkingjamService } from './minigame-parkingjam.service';

@Component({
  selector: 'minigame-parkingjam',
  templateUrl: './minigame-parkingjam.component.html',
  styles: [
  ]
})
export class MinigameParkingjamComponent {
  constructor(private parkingjamService: MinigameParkingjamService) {
    this.parkingjamService.setSize(24, 12);
  }
}
