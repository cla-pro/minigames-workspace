import { Component } from '@angular/core';
import { MinigameWordleService } from '../minigame-wordle.service';

@Component({
  selector: 'minigame-wordle-keyboard',
  templateUrl: './minigame-wordle-keyboard.component.html',
  styleUrls: ['./minigame-wordle-keyboard.component.css']
})
export class MinigameWordleKeyboardComponent {
  constructor(private service: MinigameWordleService) {}

  public isBadPlace(letter: string): boolean {
    return this.service.getKeyboardLetterState().get(letter) == 'BAD_PLACE';
  }

  public isCorrect(letter: string): boolean {
    return this.service.getKeyboardLetterState().get(letter) == 'CORRECT';
  }

  public isWrong(letter: string): boolean {
    return this.service.getKeyboardLetterState().get(letter) == 'WRONG';
  }

  public letterEntered(letter: string) {
    this.service.letterEntered(letter);
  }

  public removeLetter() {
    this.service.removeLetter();
  }

  public confirmWord() {
    this.service.confirmWord();
  }
}
