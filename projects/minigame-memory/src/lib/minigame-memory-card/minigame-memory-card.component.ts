import { Component, Input, OnInit } from '@angular/core';
import { MinigameMemoryCardDataModel } from '../shared/minigame-memory-card-data.model';
import { MinigameMemoryService } from '../minigame-memory.service';
import { MinigameMemoryImageService } from '../minigame-memory-image.service';

@Component({
  selector: 'minigame-memory-card',
  templateUrl: './minigame-memory-card.component.html',
  styleUrls: ['./minigame-memory-card.component.css']
})
export class MinigameMemoryCardComponent implements OnInit {
  @Input() cardData: MinigameMemoryCardDataModel = new MinigameMemoryCardDataModel('-1', false, false);

  imageUrl: string | undefined = "";

  constructor(private memoryService: MinigameMemoryService, private memoryImageService: MinigameMemoryImageService) {}

  ngOnInit(): void {
    this.imageUrl = this.memoryImageService.url(this.cardData.id);
  }

  flipCard(): void {
    if (!this.cardData.found) {
      this.cardData.displayed = true;
      this.memoryService.cardFliped(this.cardData);
    }
  }
}
