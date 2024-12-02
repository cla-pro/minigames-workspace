import { Injectable } from '@angular/core';
import { MinigamePuzzlePiece } from './shared/minigame-puzzle.model';

@Injectable({
  providedIn: 'root'
})
export class MinigamePuzzleService {
  private static DEFAULT_NB_REMAINING_DISPLAYED = 4;

  prefix!: string;
  puzzleSetId!: string;
  completionCallback!: () => void;

  nbRows: number = -1;
  nbCols: number = -1;
  nbRemainings: number = MinigamePuzzleService.DEFAULT_NB_REMAINING_DISPLAYED;

  private piecesOnBoard: MinigamePuzzlePiece[] = []
  // Only the first pieces are displayed
  private remainingPieces: MinigamePuzzlePiece[] = []

  constructor() { }

  public setSize(width: number, height: number) {
    this.nbCols = width;
    this.nbRows = height;
  }

  public setPieces(onBoard: MinigamePuzzlePiece[], remaining: MinigamePuzzlePiece[]) {
    this.piecesOnBoard = onBoard;
    this.remainingPieces = remaining;
  }

  public setupComplete() {
    
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

    MinigamePuzzleService.storePieces(this.prefix, this.piecesOnBoard, this.remainingPieces);
  }

  public checkCompletion(): void {
    if (this.remainingPieces.length === 0 && this.allPiecesOnBoardCorrect()) {
      this.completionCallback();
    }
  }

  private allPiecesOnBoardCorrect(): boolean {
    return this.piecesOnBoard
      .filter(p => p.boardX !== p.goalX || p.boardY !== p.goalY)
      .length === 0;
  }

  public static loadPiecesOnBoard(prefix: string): MinigamePuzzlePiece[] {
    return this.loadPieces(prefix).filter(p => p.isOnBoard());
  }

  public static loadRemainingPieces(prefix: string): MinigamePuzzlePiece[] {
    return this.shuffleArray(this.loadPieces(prefix).filter(p => !p.isOnBoard()));
  }

  private static loadPieces(prefix: string): MinigamePuzzlePiece[] {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(prefix))
      .filter(k => k.search('-piece-id') > -1)
      .map(k => {
        let id = localStorage.getItem(k);
        return (id) ? +id : 0;
      })
      .filter(id => id !== null)
      .map(id => {
        return MinigamePuzzlePiece.load(prefix, id)
      });
  }

  private static shuffleArray<T>(array: T[]): T[] {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  public static storePieces(prefix: string, piecesOnBoard: MinigamePuzzlePiece[], remainingPieces: MinigamePuzzlePiece[]) {
    piecesOnBoard.forEach(p => p.store(prefix));
    remainingPieces.forEach(p => p.store(prefix));
  }
}
