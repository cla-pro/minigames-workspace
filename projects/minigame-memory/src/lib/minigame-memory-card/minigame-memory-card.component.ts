import { Component, Input } from '@angular/core';
import { MinigameMemoryCardDataModel } from '../shared/minigame-memory-card-data.model';
import { MinigameMemoryService } from '../minigame-memory.service';

@Component({
  selector: 'minigame-memory-card',
  templateUrl: './minigame-memory-card.component.html',
  styleUrls: ['./minigame-memory-card.component.css']
})
export class MinigameMemoryCardComponent {
  @Input() cardData: MinigameMemoryCardDataModel = new MinigameMemoryCardDataModel(-1, false, false);

  constructor(private memoryService: MinigameMemoryService) {}

  flipCard(): void {
    if (!this.cardData.found) {
      this.cardData.displayed = true;
      this.memoryService.cardFliped(this.cardData);
    }
  }
}
