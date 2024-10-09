import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MinigamePuzzleService } from './minigame-puzzle.service';
import { MinigamePuzzlePiece } from './shared/minigame-puzzle.model';

@Component({
  selector: 'minigame-puzzle',
  templateUrl: './minigame-puzzle.component.html',
  styleUrls: ['./minigame-puzzle.component.css']
})
export class MinigamePuzzleComponent implements OnInit {
  @Input() prefix: string = "";
  @Input() width: number = 0;
  @Input() height: number = 0;
  @Input() puzzleSetId: string = "";
  @Input() piecesOnBoard: MinigamePuzzlePiece[] = [];
  @Input() remainingPieces: MinigamePuzzlePiece[] = [];
  
  @Output() completionEvent = new EventEmitter<boolean>();

  constructor(private service: MinigamePuzzleService) {}

  ngOnInit(): void {
    this.service.prefix = this.prefix;
    this.service.setSize(this.width, this.height);
    this.service.puzzleSetId = this.puzzleSetId;
    this.service.setPieces(this.piecesOnBoard, this.remainingPieces);
    let that = this;
    this.service.completionCallback = () => { that.completionEvent.emit(); };
    this.service.setupComplete();
  }
}
