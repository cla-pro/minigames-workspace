import { Injectable } from '@angular/core';
import { MinigamePuzzlePiece } from './shared/minigame-puzzle.model';

@Injectable({
  providedIn: 'root'
})
export class MinigamePuzzleService {
  private static DEFAULT_NB_REMAINING_DISPLAYED = 4;

  prefix!: string;
  puzzleSetId!: string;
  completionCallback!: (bonus: boolean) => void;

  nbRows: number = -1;
  nbCols: number = -1;
  nbRemainings: number = MinigamePuzzleService.DEFAULT_NB_REMAINING_DISPLAYED;

  private piecesOnBoard: MinigamePuzzlePiece[] = []
  // Only the first pieces are displayed
  private remainingPieces: MinigamePuzzlePiece[] = []

  constructor() { }

  public setupComplete() {
    this.loadFromStorage();
  }

  public piecesOnBoardToDraw(): MinigamePuzzlePiece[] {
    return this.piecesOnBoard;
  }

  public allRemainingPieces(): MinigamePuzzlePiece[] {
    return this.remainingPieces;
  }

  public remainingPiecesToDraw(): MinigamePuzzlePiece[] {
    return this.remainingPieces.slice(0, this.nbRemainings);
  }

  public pieceInCell(y: number, x: number) {
    let piece = this.piecesOnBoard.filter(p => p.boardX === x && p.boardY === y);
    return (piece.length === 0) ? undefined : piece[0];
  }

  public movePiece(piece: MinigamePuzzlePiece, y: number, x: number) {
    if (piece.boardX == -1 && x > -1) {
      // move from remaining to board
      this.piecesOnBoard.push(piece);
      this.remainingPieces = this.remainingPieces.filter(p => p != piece);
    } else if (piece.boardX > -1) {
      if (x == -1) {
        // move from board to remaining
        this.piecesOnBoard = this.piecesOnBoard.filter(p => p !== piece);
        this.remainingPieces.unshift(piece);
      }
    }

    piece.boardX = x;
    piece.boardY = y;
  }

  public checkCompletion(): void {
    if (this.remainingPieces.length === 0 && this.allPiecesOnBoardCorrect()) {
      this.completionCallback(false);
    }
  }

  private allPiecesOnBoardCorrect(): boolean {
    return this.piecesOnBoard
      .filter(p => p.boardX !== p.goalX || p.boardY !== p.goalY)
      .length === 0;
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
    this.nbRows = 6;
    this.nbCols = 4;
    this.nbRemainings = this.nbCols - 1;
    let pieces = [
      new MinigamePuzzlePiece(11, -1, -1, 0, 0),
      new MinigamePuzzlePiece(12, -1, -1, 0, 1),
      new MinigamePuzzlePiece(13, -1, -1, 0, 2),
      new MinigamePuzzlePiece(14, -1, -1, 0, 3),
      new MinigamePuzzlePiece(21, -1, -1, 1, 0),
      new MinigamePuzzlePiece(22, -1, -1, 1, 1),
      new MinigamePuzzlePiece(23, -1, -1, 1, 2),
      new MinigamePuzzlePiece(24, -1, -1, 1, 3),
      new MinigamePuzzlePiece(31, -1, -1, 2, 0),
      new MinigamePuzzlePiece(32, -1, -1, 2, 1),
      new MinigamePuzzlePiece(33, -1, -1, 2, 2),
      new MinigamePuzzlePiece(34, -1, -1, 2, 3),
      new MinigamePuzzlePiece(41, -1, -1, 3, 0),
      new MinigamePuzzlePiece(42, -1, -1, 3, 1),
      new MinigamePuzzlePiece(43, -1, -1, 3, 2),
      new MinigamePuzzlePiece(44, -1, -1, 3, 3),
      new MinigamePuzzlePiece(51, -1, -1, 4, 0),
      new MinigamePuzzlePiece(52, -1, -1, 4, 1),
      new MinigamePuzzlePiece(53, -1, -1, 4, 2),
      new MinigamePuzzlePiece(54, -1, -1, 4, 3),
      new MinigamePuzzlePiece(61, -1, -1, 5, 0),
      new MinigamePuzzlePiece(62, -1, -1, 5, 1),
      new MinigamePuzzlePiece(63, -1, -1, 5, 2),
      new MinigamePuzzlePiece(64, -1, -1, 5, 3)
    ];
    
    this.piecesOnBoard = pieces.filter(p => p.isOnBoard())
    this.remainingPieces = pieces.filter(p => !p.isOnBoard())
  }
}
