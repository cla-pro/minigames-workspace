import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MinigameFifteenPuzzleService } from './minigame-fifteen-puzzle.service';

@Component({
  selector: 'minigame-fifteen-puzzle',
  templateUrl: './minigame-fifteen-puzzle.component.html',
  styleUrls: ['./minigame-fifteen-puzzle.component.css']
})
export class MinigameFifteenPuzzleComponent implements OnInit {
  @Input() prefix: string = "";
  
  @Output() completionEvent = new EventEmitter<boolean>();

  constructor(private service: MinigameFifteenPuzzleService) {}

  ngOnInit(): void {
    this.service.prefix = this.prefix;
    let that = this;
    this.service.completionCallback = (bonus: boolean) => { that.completionEvent.emit(bonus); };
    this.service.setupComplete();
  }
}
