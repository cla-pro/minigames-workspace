import { Component, Input, OnInit } from '@angular/core';
import { MinigameWordleService } from '../minigame-wordle.service';
import { MinigameWordleLetterModel } from '../shared/minigame-wordle-letter.model';

@Component({
  selector: 'minigame-wordle-letter',
  templateUrl: './minigame-wordle-letter.component.html',
  styleUrls: ['./minigame-wordle-letter.component.css']
})
export class MinigameWordleLetterComponent implements OnInit {
  @Input() line: number = -1;
  @Input() index: number = -1;

  letter: MinigameWordleLetterModel = new MinigameWordleLetterModel(" ", "EMPTY");

  public isBadPlace(): boolean {
    return this.letter.state == 'BAD_PLACE';
  }

  public isCorrect(): boolean {
    return this.letter.state == 'CORRECT';
  }

  constructor(private wordleService: MinigameWordleService) {}

  ngOnInit(): void {
    this.letter = this.wordleService.getLetter(this.line, this.index);
  }
}
