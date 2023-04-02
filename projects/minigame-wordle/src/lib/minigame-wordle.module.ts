import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinigameWordleComponent } from './minigame-wordle.component';
import { MinigameWordleLineComponent } from './minigame-wordle-line/minigame-wordle-line.component';
import { MinigameWordleLetterComponent } from './minigame-wordle-letter/minigame-wordle-letter.component';

@NgModule({
  declarations: [
    MinigameWordleComponent,
    MinigameWordleLineComponent,
    MinigameWordleLetterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MinigameWordleComponent
  ]
})
export class MinigameWordleModule { }
