import { Component } from '@angular/core';
import { MinigameMemoryService } from '../minigame-memory.service';

@Component({
  selector: 'minigame-memory-zoom',
  templateUrl: './minigame-memory-zoom.component.html',
  styleUrls: ['./minigame-memory-zoom.component.css']
})
export class MinigameMemoryZoomComponent {
  
  get srcUrl(): string | undefined { return this.service.zoomUrl; }
  get active(): boolean { return this.srcUrl !== undefined; }

  constructor(private service: MinigameMemoryService) {}
}
