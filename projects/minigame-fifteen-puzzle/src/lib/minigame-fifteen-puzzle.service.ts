import { Injectable } from '@angular/core';
import { MinigameFifteenPuzzlePiece } from './shared/minigame-fifteen-puzzle.model';
import { MinigameCommonPosition } from 'projects/minigame-common/src/lib/minigame-common.model';

@Injectable({
  providedIn: 'root'
})
export class MinigameFifteenPuzzleService {
  static NB_CELLS = 4;

  pieces: MinigameFifteenPuzzlePiece[] = [];

  prefix!: string;
  completionCallback!: (bonus: boolean) => void;

  constructor() {}

  setupComplete() {
    this.loadFromStorage();
  }

  pieceInCell(y: number, x: number) {
    var p = this.pieces.filter(p => p.boardX === x && p.boardY === y);

    return (p.length === 1) ? p[0] : null;
  }

  getFreeSpaceNextTo(y: number, x: number): MinigameCommonPosition | null {
    let free = [
      new MinigameCommonPosition(y - 1, x),
      new MinigameCommonPosition(y + 1, x),
      new MinigameCommonPosition(y, x - 1),
      new MinigameCommonPosition(y, x + 1)]
      .filter(p => p.x >= 0 && p.y >= 0 && p.x < MinigameFifteenPuzzleService.NB_CELLS && p.y < MinigameFifteenPuzzleService.NB_CELLS)
      .filter(p => this.pieces.filter(pie => pie.boardX === p.x && pie.boardY === p.y).length === 0)
    
    return (free.length === 0) ? null : free[0];
  }

  movePiece(piece: MinigameFifteenPuzzlePiece, newPosition: MinigameCommonPosition) {
    piece.boardY = newPosition.y;
    piece.boardX = newPosition.x;

    if (this.isCompleted()) {
      this.completionCallback(false);
    }
  }

  private isCompleted(): boolean {
    return this.pieces
      .filter(p => p.isMissplaced())
      .length === 0
  }

  private loadFromStorage() {
    /*
    let pieces = Object.keys(localStorage)
      .filter(k => k.startsWith(this.prefix))
      .filter(k => k.search('_piece_id') > -1)
      .map(k => {
        let id = localStorage.getItem(k);
        return (id) ? +id : 0;
      })
      .filter(id => id !== null)
      .map(id => {
        return new MinigamePuzzlePiece(id, -1, -1, -1, -1)
      });*/
    this.pieces = [
      new MinigameFifteenPuzzlePiece(1, 0, 0, 0, 0),
      new MinigameFifteenPuzzlePiece(2, 0, 1, 0, 1),
      new MinigameFifteenPuzzlePiece(3, 0, 2, 0, 2),
      new MinigameFifteenPuzzlePiece(4, 0, 3, 0, 3),
      new MinigameFifteenPuzzlePiece(5, 1, 0, 1, 0),
      new MinigameFifteenPuzzlePiece(6, 1, 1, 1, 1),
      new MinigameFifteenPuzzlePiece(7, 1, 2, 1, 2),
      new MinigameFifteenPuzzlePiece(8, 1, 3, 1, 3),
      new MinigameFifteenPuzzlePiece(9, 2, 0, 2, 0),
      new MinigameFifteenPuzzlePiece(10, 2, 1, 2, 1),
      new MinigameFifteenPuzzlePiece(11, 2, 2, 2, 2),
      new MinigameFifteenPuzzlePiece(12, 2, 3, 2, 3),
      new MinigameFifteenPuzzlePiece(13, 3, 1, 3, 0),
      new MinigameFifteenPuzzlePiece(14, 3, 2, 3, 1),
      new MinigameFifteenPuzzlePiece(15, 3, 3, 3, 2),
    ];
  }
}
