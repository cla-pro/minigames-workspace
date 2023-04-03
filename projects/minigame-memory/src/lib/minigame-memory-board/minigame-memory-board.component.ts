import { Component, OnInit } from '@angular/core';
import { MinigameMemoryCardDataModel } from '../shared/minigame-memory-card-data.model';
import { MinigameMemoryService } from '../minigame-memory.service';

@Component({
  selector: 'minigame-memory-board',
  templateUrl: './minigame-memory-board.component.html',
  styleUrls: ['./minigame-memory-board.component.css']
})
export class MinigameMemoryBoardComponent implements OnInit {
  board: MinigameMemoryCardDataModel[][] = [];

  constructor(private memoryService: MinigameMemoryService) {}

  ngOnInit(): void {
    this.board = this.memoryService.board;
  }
}
