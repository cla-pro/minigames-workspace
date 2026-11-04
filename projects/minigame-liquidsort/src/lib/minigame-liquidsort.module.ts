import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinigameLiquidsortComponent } from './minigame-liquidsort.component';
import { MinigameLiquidsortBoardComponent } from './minigame-liquidsort-board/minigame-liquidsort-board.component';

@NgModule({
  declarations: [
    MinigameLiquidsortComponent,
    MinigameLiquidsortBoardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MinigameLiquidsortComponent
  ]
})
export class MinigameLiquidsortModule { }
