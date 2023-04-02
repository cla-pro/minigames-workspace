import { Component, Input } from '@angular/core';
import { MinigameWordleService } from '../minigame-wordle.service';

@Component({
  selector: 'minigame-wordle-line',
  templateUrl: './minigame-wordle-line.component.html',
  styleUrls: ['./minigame-wordle-line.component.css']
})
export class MinigameWordleLineComponent {
  @Input() line: number = -1;

  constructor(private wordleService: MinigameWordleService) {}
}
