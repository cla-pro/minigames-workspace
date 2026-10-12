import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'minigame-liquidsort',
  standalone: false,
  templateUrl: './minigame-liquidsort.component.html',
  styleUrls: ['./minigame-liquidsort.component.css'],
})
export class MinigameLiquidsortComponent {
  @Input() prefix: string = "";
  
  @Output() completionEvent = new EventEmitter<boolean>();
}
