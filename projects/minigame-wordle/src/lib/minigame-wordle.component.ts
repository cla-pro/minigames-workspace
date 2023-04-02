import { Component, Input, OnInit } from '@angular/core';
import { MinigameWordleService } from './minigame-wordle.service';

@Component({
  selector: 'minigame-wordle',
  templateUrl: './minigame-wordle.component.html',
  styleUrls: ['./minigame-wordle.component.css'],
  host: {
    '(document:keyup)': 'keyup($event)'
  }
})
export class MinigameWordleComponent implements OnInit {
  @Input() prefix: string = "";

  private status: string = "RUNNING";

  constructor(private wordleService: MinigameWordleService) {}

  ngOnInit(): void {
    this.wordleService.setPrefix(this.prefix);
  }
  
  keyup(event: KeyboardEvent): void {
    if (this.status === "RUNNING") {
      if (event.key === 'Enter') {
        this.wordleService.confirmWord();
        if (this.wordleService.isCompleted()) {
          this.status = "COMPLETED";
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
