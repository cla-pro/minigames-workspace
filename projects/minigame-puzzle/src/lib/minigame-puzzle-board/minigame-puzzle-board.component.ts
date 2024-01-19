import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { MinigamePuzzleService } from '../minigame-puzzle.service';
import { MinigamePuzzlePiece } from '../shared/minigame-puzzle.model';
import { MinigameCommonComponent, MinigameCommonImageService } from 'projects/minigame-common/src/public-api';
import { Subscription } from 'rxjs';
import { MinigameCommonTouchService } from 'projects/minigame-common/src/lib/minigame-common-touch.service';
import { MinigameCommonPosition } from 'projects/minigame-common/src/lib/minigame-common.model';

@Component({
  selector: 'minigame-puzzle-board',
  templateUrl: './minigame-puzzle-board.component.html',
  styleUrl: './minigame-puzzle-board.component.css'
})
export class MinigamePuzzleBoardComponent implements AfterViewInit, OnDestroy {
  private static BOARD_SIZE_PERCENT: number = 0.8;
  private static PIECE_RATIO = (284.0 / 196.0 + 380.0 / 256.0) / 2.0;

  @Input() prefix: string = "";
  @Input() puzzleSetId: string = "";

  @ViewChild('board')
  boardDiv: ElementRef<HTMLDivElement> = {} as ElementRef;

  @ViewChild('canvas') 
  canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  private ctx!: CanvasRenderingContext2D;

  private heightPx: number = 0;
  private widthPx: number = 0;
  private cellSize: number = -1;
  private pieceSize: number = -1;
  private remainingCellSize: number = 0;
  private remainingOffset: number = 0;

  private imagePrefix: string = "";
  private images: Map<string, any> = new Map();

  private movingPiece: MinigamePuzzlePiece | null = null
  private movingPieceX: number = -1;
  private movingPieceY: number = -1;

  constructor(private service: MinigamePuzzleService, private imageService: MinigameCommonImageService, private touchService: MinigameCommonTouchService) {
    let that = this;
    this.touchService.startCallback = (x, y) => that.startTouch(x, y);
    this.touchService.endCallback = () => that.endTouch();
    this.touchService.moveCallback = (x, y) => this.moveTouch(x, y);
  }

  ngAfterViewInit(): void {
    this.imagePrefix = this.prefix + "_" + this.puzzleSetId + "_";

    let nativ = this.canvas.nativeElement;
    this.calculateAndSetSizes(nativ);

    this.touchService.trackMovementOn(nativ);
    this.ctx = nativ.getContext('2d')!;
    this.ctx.clearRect(0, 0, nativ.width, nativ.height);

    this.loadImages();
    this.drawBorders();
    this.drawRemainingPieces();
  }

  private calculateAndSetSizes(nativ: HTMLCanvasElement) {
    let nativDiv = this.boardDiv.nativeElement;
    let divWidth = nativDiv.clientWidth;
    let divHeight = nativDiv.clientHeight;
    let divCellSize = this.calculateCellSize(this.service.nbRows, this.service.nbCols, divHeight * MinigamePuzzleBoardComponent.BOARD_SIZE_PERCENT, divWidth);
    let allCellWidth = this.service.nbCols * divCellSize;
    let allCellHeight = this.service.nbRows * divCellSize;
    let totalHeight = allCellHeight / MinigamePuzzleBoardComponent.BOARD_SIZE_PERCENT;

    this.heightPx = totalHeight;
    this.widthPx = allCellWidth;

    nativ.width = this.widthPx;
    nativ.height = this.heightPx;

    this.cellSize = divCellSize;
    this.pieceSize = Math.ceil(this.cellSize * MinigamePuzzleBoardComponent.PIECE_RATIO);

    this.remainingCellSize = this.widthPx / this.service.nbRemainings;
    this.remainingOffset = allCellHeight;
  }

  private calculateCellSize(nbRows: number, nbCols: number, h: number, w: number): number {
    let sizeY = Math.floor(h / nbRows);
    let sizeX = Math.floor(w / nbCols);
    return Math.min(sizeY, sizeX);
  }

  private loadImages() {
    this.service.allRemainingPieces()
        .forEach(p => {
          let obs = this.imageService.getImageForKey(this.imagePrefix + p.id);
          obs.subscribe(res => {
            this.images.set(this.imagePrefix + p.id, res);
            this.drawRemainingPieces();
          });
        });
  }

  private redisplay(): void {
    this.drawBorders();
    this.drawBoard();
    this.drawRemainingPieces();
  }

  private drawBorders(): void {
    this.ctx.clearRect(0, 0, this.widthPx, this.heightPx);

    this.ctx.save();
    this.ctx.strokeStyle = "#000000";

    this.ctx.beginPath();
    this.ctx.moveTo(0, this.remainingOffset);
    this.ctx.lineTo(this.widthPx, this.remainingOffset);
    this.ctx.stroke();

    this.ctx.strokeStyle = "#666666";
    for (let i = 1; i <= this.service.nbRows; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.cellSize);
      this.ctx.lineTo(this.widthPx, i * this.cellSize);
      this.ctx.stroke();
    }
    for (let i = 1; i <= this.service.nbCols; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.cellSize, 0);
      this.ctx.lineTo(i * this.cellSize, this.remainingOffset);
      this.ctx.stroke();
    }

    this.ctx.restore();
  }

  private drawBoard(): void {
    let toDraw = this.service.piecesOnBoardToDraw();

    toDraw.forEach((p: MinigamePuzzlePiece, index: number) => {
      if (this.movingPiece !== p) {
        this.drawPiece(p, (p.boardY + 0.5) * this.cellSize, (p.boardX + 0.5) * this.cellSize, this.pieceSize);
      }
    });
  }

  private drawRemainingPieces(): void {
    let toDraw = this.service.remainingPiecesToDraw();

    toDraw.forEach((p: MinigamePuzzlePiece, index: number) => {
      if (this.movingPiece !== p) {
        console.log(p.id);
        this.drawPiece(p, this.remainingOffset + this.remainingCellSize / 2, this.remainingIndexToCenterPosition(index), this.pieceSize);
      }
    });
  }

  private drawMovingPiece(): void {
    if (this.movingPiece) {
      this.drawPiece(this.movingPiece, this.movingPieceY, this.movingPieceX, this.pieceSize);
    }
  }

  private drawPiece(piece: MinigamePuzzlePiece, centerY: number, centerX: number, size: number) {
    let img = this.images.get(this.imagePrefix + piece.id);
    console.log(this.imagePrefix + piece.id + " " + img);
    
    if (img !== undefined) {
      this.ctx.drawImage(img, centerX - size / 2, centerY - size / 2, size, size);
    }
  }

  private remainingIndexToCenterPosition(index: number): number {
    return (index + 0.5) * this.remainingCellSize;
  }

  private pixelToCell(y: number, x: number) {
    return new MinigameCommonPosition(Math.floor(y / this.cellSize), Math.floor(x / this.cellSize));
  }

  private startTouch(x: number, y: number) {
    var matching = undefined;
    if (y < this.remainingOffset) {
      let cell = this.pixelToCell(y, x);
      matching = this.service.pieceInCell(cell.y, cell.x);
    } else {
      let matchings = this.service
        .remainingPiecesToDraw()
        .filter((p, index) => {
          let center = this.remainingIndexToCenterPosition(index);
          return x >= (center - this.pieceSize / 2) && x <= (center + this.pieceSize / 2);
        });
      matching = (matchings.length > 0) ? matchings[0] : undefined;
    }
    
    if (matching !== undefined) {
      this.movingPiece = matching;
      this.movingPieceX = x;
      this.movingPieceY = y;
      this.redisplay();
      this.drawMovingPiece();
    }
  }

  private endTouch() {
    if (this.movingPiece) {
      if (this.movingPieceY > this.remainingOffset) {
        // moved to the remainings!
        this.service.movePiece(this.movingPiece!, -1, -1);
      } else {
        // moved to the board
        let cell = this.pixelToCell(this.movingPieceY, this.movingPieceX);
        if (this.service.pieceInCell(cell.y, cell.x) === undefined) {
          // TODO check if the cell is already occupied
          this.service.movePiece(this.movingPiece!, cell.y, cell.x);
        }
      }

      this.movingPiece = null;
      this.movingPieceX = -1;
      this.movingPieceY = -1;

      this.redisplay();

      this.service.checkCompletion();
    }
  }

  private moveTouch(x: number, y: number) {
    if (this.movingPiece) {
      this.movingPieceX = x;
      this.movingPieceY = y;

      this.redisplay();
      this.drawMovingPiece();
    }
  }

  ngOnDestroy(): void {
    this.touchService.stopTracking();
  }
}
