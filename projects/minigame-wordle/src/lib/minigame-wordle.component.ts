import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MinigameWordleService } from './minigame-wordle.service';

@Component({
  selector: 'minigame-wordle',
  templateUrl: './minigame-wordle.component.html',
  styleUrls: ['./minigame-wordle.component.css'],
  /*host: {
    '(document:keyup)': 'keyup($event)'
  }*/
})
export class MinigameWordleComponent implements OnInit {
  @Input() prefix: string = "";
  @Input() word: string[] = [];
  
  @Output() completionEvent = new EventEmitter<boolean>();

  private status: string = "RUNNING";

  constructor(private wordleService: MinigameWordleService) {}

  ngOnInit(): void {
    this.wordleService.setPrefix(this.prefix);
    this.wordleService.setWord(this.word);
  }
  
  keyup(event: KeyboardEvent): void {
    if (!this.wordleService.isCompleted()) {
      if (event.key === 'Enter') {
        this.wordleService.confirmWord();
        if (this.wordleService.isCompleted()) {
          this.completionEvent.emit(this.wordleService.hasBonus());
        }
      } else if (event.key === 'Backspace') {
        this.wordleService.removeLetter();
      } else if (event.key.length === 1 && /^[a-zA-Z]/i.test(event.key)) {
        this.wordleService.letterEntered(event.key);
      } else {
        console.log(event);
      }
    }
  }
}
