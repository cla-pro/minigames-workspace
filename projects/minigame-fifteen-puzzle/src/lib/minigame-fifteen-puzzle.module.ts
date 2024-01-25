import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinigameFifteenPuzzleComponent } from './minigame-fifteen-puzzle.component';
import { MinigameFifteenPuzzleBoardComponent } from './minigame-fifteen-puzzle-board/minigame-fifteen-puzzle-board.component';

@NgModule({
  declarations: [
    MinigameFifteenPuzzleComponent,
    MinigameFifteenPuzzleBoardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MinigameFifteenPuzzleComponent
  ]
})
export class MinigameFifteenPuzzleModule { }
