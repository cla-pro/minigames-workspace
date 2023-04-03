import { NgModule } from '@angular/core';
import { MinigameMemoryComponent } from './minigame-memory.component';
import { MinigameMemoryCardComponent } from './minigame-memory-card/minigame-memory-card.component';
import { MinigameMemoryBoardComponent } from './minigame-memory-board/minigame-memory-board.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MinigameMemoryComponent,
    MinigameMemoryCardComponent,
    MinigameMemoryBoardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MinigameMemoryComponent
  ]
})
export class MinigameMemoryModule { }
