import { NgModule } from '@angular/core';
import { MinigameParkingjamComponent } from './minigame-parkingjam.component';
import { MinigameParkingjamBoardComponent } from './minigame-parkingjam-board/minigame-parkingjam-board.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MinigameParkingjamComponent,
    MinigameParkingjamBoardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MinigameParkingjamComponent
  ]
})
export class MinigameParkingjamModule { }
