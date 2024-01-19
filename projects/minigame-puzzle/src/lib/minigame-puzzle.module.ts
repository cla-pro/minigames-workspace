import { NgModule } from '@angular/core';
import { MinigamePuzzleComponent } from './minigame-puzzle.component';
import { CommonModule } from '@angular/common';
import { MinigamePuzzleBoardComponent } from './minigame-puzzle-board/minigame-puzzle-board.component';

@NgModule({
  declarations: [
    MinigamePuzzleComponent,
    MinigamePuzzleBoardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MinigamePuzzleComponent
  ]
})
export class MinigamePuzzleModule { }
