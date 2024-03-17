import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { MinigameFifteenPuzzleService } from '../minigame-fifteen-puzzle.service';
import { MinigameCommonImageService, MinigameCommonTouchService } from 'projects/minigame-common/src/public-api';
import { MinigameFifteenPuzzlePiece } from '../shared/minigame-fifteen-puzzle.model';
import { MinigameCommonPosition } from 'projects/minigame-common/src/lib/minigame-common.model';

@Component({
  selector: 'minigame-fifteen-puzzle-board',
  templateUrl: './minigame-fifteen-puzzle-board.component.html',
  styleUrl: './minigame-fifteen-puzzle-board.component.css'
})
export class MinigameFifteenPuzzleBoardComponent implements AfterViewInit, OnDestroy {
  @Input() prefix: string = "";

  @ViewChild('board')
  boardDiv: ElementRef<HTMLDivElement> = {} as ElementRef;

  @ViewChild('canvas') 
  canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  private ctx!: CanvasRenderingContext2D;

  private heightPx: number = 0;
  private widthPx: number = 0;
  private cellSize: number = -1;

  private imagePrefix: string = "15-puzzle_";
  private images: Map<string, any> = new Map();

  private movingPiece: MinigameFifteenPuzzlePiece | null = null;
  private movingPieceY: number = 0;
  private movingPieceX: number = 0;
  private movingVertical: boolean = true;
  private movingMin: number = 0;
  private movingMax: number = 0;

  constructor(private service: MinigameFifteenPuzzleService, private imageService: MinigameCommonImageService, private touchService: MinigameCommonTouchService) {
    let that = this;
    this.touchService.startCallback = (x, y) => that.startTouch(x, y);
    this.touchService.endCallback = () => that.endTouch();
    this.touchService.moveCallback = (x, y) => this.moveTouch(x, y);
  }

  ngAfterViewInit(): void {
    let nativ = this.canvas.nativeElement;
    this.calculateAndSetSizes(nativ);

    this.touchService.trackMovementOn(nativ);
    this.ctx = nativ.getContext('2d')!;
    this.ctx.clearRect(0, 0, nativ.width, nativ.height);

    this.loadImages();
    this.draw();
  }

  private calculateAndSetSizes(nativ: HTMLCanvasElement) {
    let nativDiv = this.boardDiv.nativeElement;
    let divWidth = nativDiv.clientWidth;
    let divHeight = nativDiv.clientHeight;
    let divCellSize = this.calculateCellSize(MinigameFifteenPuzzleService.NB_CELLS, divHeight, divWidth);
    let allCellWidth = MinigameFifteenPuzzleService.NB_CELLS * divCellSize;
    let allCellHeight = MinigameFifteenPuzzleService.NB_CELLS * divCellSize;

    this.heightPx = allCellHeight;
    this.widthPx = allCellWidth;

    nativ.width = this.widthPx;
    nativ.height = this.heightPx;

    this.cellSize = divCellSize;
  }

  private calculateCellSize(nbCells: number, h: number, w: number): number {
    let sizeY = Math.floor(h / nbCells);
    let sizeX = Math.floor(w / nbCells);
    return Math.min(sizeY, sizeX);
  }

  private pixelToCell(y: number, x: number) {
    return new MinigameCommonPosition(Math.floor(y / this.cellSize), Math.floor(x / this.cellSize));
  }

  private indexToPixel(idx: number) {
    return (idx + 0.5) * this.cellSize;
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.widthPx, this.heightPx);

    this.service.pieces
      .forEach(p => {
        if (p !== this.movingPiece) {
          this.drawPiece(p, this.indexToPixel(p.boardY), this.indexToPixel(p.boardX), this.cellSize);
        }
      })
  }

  private drawMoving() {
    if (this.movingPiece) {
      this.drawPiece(this.movingPiece, this.movingPieceY, this.movingPieceX, this.cellSize)
    }
  }

  private drawPiece(piece: MinigameFifteenPuzzlePiece, centerY: number, centerX: number, size: number) {
    let img = this.images.get(this.imagePrefix + piece.value);
    
    if (img !== undefined) {
      this.ctx.drawImage(img, centerX - size / 2, centerY - size / 2, size, size);
    }
  }

  private loadImages() {
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        .forEach(p => {
          let obs = this.imageService.getImageForKey(this.imagePrefix + p);
          obs.subscribe(res => {
            this.images.set(this.imagePrefix + p, res);
            this.draw();
          });
        });
  }

  private startTouch(x: number, y: number) {
    let cell = this.pixelToCell(y, x);
    let moving = this.service.pieceInCell(cell.y, cell.x);
    let freeSpace = this.service.getFreeSpaceNextTo(cell.y, cell.x);

    if (moving && freeSpace) {
      this.movingPiece = moving;
      this.movingVertical = moving.boardX === freeSpace.x;
      this.movingMin = (this.movingVertical) ? this.indexToPixel(Math.min(moving.boardY, freeSpace.y)) : this.indexToPixel(Math.min(moving.boardX, freeSpace.x));
      this.movingMax = (this.movingVertical) ? this.indexToPixel(Math.max(moving.boardY, freeSpace.y)) : this.indexToPixel(Math.max(moving.boardX, freeSpace.x));
      this.movingPieceY = (this.movingVertical) ? Math.min(Math.max(y, this.movingMin), this.movingMax) : this.indexToPixel(moving.boardY);
      this.movingPieceX = (this.movingVertical) ? this.indexToPixel(moving.boardX) : Math.min(Math.max(x, this.movingMin), this.movingMax);
    }
  }

  private endTouch() {
    if (this.movingPiece) {
      let cell = this.pixelToCell(this.movingPieceY, this.movingPieceX);
      this.service.movePiece(this.movingPiece, new MinigameCommonPosition(cell.y, cell.x));

      this.movingPiece = null;

      this.draw();
    }
  }

  private moveTouch(x: number, y: number) {
    if (this.movingPiece) {
      if (this.movingVertical) {
        this.movingPieceY = Math.min(Math.max(y, this.movingMin), this.movingMax);
      } else {
        this.movingPieceX = Math.min(Math.max(x, this.movingMin), this.movingMax);
      }

      this.draw();
      this.drawMoving();
    }
  }

  ngOnDestroy(): void {
    this.touchService.stopTracking();
  }
}
