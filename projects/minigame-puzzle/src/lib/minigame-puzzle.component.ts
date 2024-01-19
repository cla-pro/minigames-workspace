import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MinigamePuzzleService } from './minigame-puzzle.service';

@Component({
  selector: 'minigame-puzzle',
  templateUrl: './minigame-puzzle.component.html',
  styleUrls: ['./minigame-puzzle.component.css']
})
export class MinigamePuzzleComponent implements OnInit {
  @Input() prefix: string = "";
  @Input() puzzleSetId: string = "";
  
  @Output() completionEvent = new EventEmitter<boolean>();

  constructor(private service: MinigamePuzzleService) {}

  ngOnInit(): void {
    this.service.prefix = this.prefix;
    this.service.puzzleSetId = this.puzzleSetId;
    let that = this;
    this.service.completionCallback = (bonus: boolean) => { that.completionEvent.emit(bonus); };
    this.service.setupComplete();
  }
}
