export class MinigamePuzzlePiece {
  public displayed: boolean = true;

  constructor(
    public id: number,
    public boardY: number,
    public boardX: number,
    public goalY: number,
    public goalX: number) {}
  
  public isOnBoard(): boolean { return this.boardX > -1; }
}