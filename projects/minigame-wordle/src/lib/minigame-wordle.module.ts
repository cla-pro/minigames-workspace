import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinigameWordleComponent } from './minigame-wordle.component';
import { MinigameWordleLineComponent } from './minigame-wordle-line/minigame-wordle-line.component';
import { MinigameWordleLetterComponent } from './minigame-wordle-letter/minigame-wordle-letter.component';
import { MinigameWordleKeyboardComponent } from './minigame-wordle-keyboard/minigame-wordle-keyboard.component';

@NgModule({
  declarations: [
    MinigameWordleComponent,
    MinigameWordleLineComponent,
    MinigameWordleLetterComponent,
    MinigameWordleKeyboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MinigameWordleComponent
  ]
})
export class MinigameWordleModule { }
