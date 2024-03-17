import { Injectable } from '@angular/core';
import { MinigameFifteenPuzzlePiece } from './shared/minigame-fifteen-puzzle.model';
import { MinigameCommonPosition } from 'projects/minigame-common/src/lib/minigame-common.model';
import { MinigameCommonStorageService } from 'projects/minigame-common/src/lib/minigame-common-storage.service';

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
    this.pieces = this.loadPiecesFromStorage(this.prefix);
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
      .filter(p => p.isMisplaced())
      .length === 0
  }

  public storePiecesToStorage(prefix: string, pieces: MinigameFifteenPuzzlePiece[]) {
    pieces.forEach(p => {
      let piecePrefix = prefix + "_piece_" + p.value + "_";
      localStorage.setItem(piecePrefix + "piece_id", `${p.value}`);
      localStorage.setItem(piecePrefix + "boardX", `${p.boardX}`);
      localStorage.setItem(piecePrefix + "boardY", `${p.boardY}`);
      localStorage.setItem(piecePrefix + "goalX", `${p.goalX}`);
      localStorage.setItem(piecePrefix + "goalY", `${p.goalY}`);
    })
  }

  public loadPiecesFromStorage(prefix: string) {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(prefix))
      .filter(k => k.search('_piece_id') > -1)
      .map(k => {
        let id = localStorage.getItem(k);
        return (id) ? +id : -1;
      })
      .filter(id => id > -1)
      .map(id => {
        console.log(id);
        let piecePrefix = prefix + "_piece_" + id + "_";
        let boardX = MinigameCommonStorageService.loadNumberFromStorage(piecePrefix + "boardX", -1);
        let boardY = MinigameCommonStorageService.loadNumberFromStorage(piecePrefix + "boardY", -1);
        let goalX = MinigameCommonStorageService.loadNumberFromStorage(piecePrefix + "goalX", -1);
        let goalY = MinigameCommonStorageService.loadNumberFromStorage(piecePrefix + "goalY", -1);
        return new MinigameFifteenPuzzlePiece(id, boardY, boardX, goalY, goalX)
      });
  }
}
