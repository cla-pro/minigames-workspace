import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MinigameLiquidsortBottleService } from '../minigame-liquidsort-bottle.service';
import { MinigameLiquidSortBottle } from '../shared/minigame-liquidsort.model';
import { MinigameCommonImageService } from 'projects/minigame-common/src/public-api';

@Component({
  selector: 'minigame-liquidsort-board',
  templateUrl: './minigame-liquidsort-board.component.html',
  styleUrl: './minigame-liquidsort-board.component.css',
  standalone: false
})
export class MinigameLiquidsortBoardComponent implements AfterViewInit {
  static NB_CELLS = 4;

  @Input() prefix: string = "";

  @ViewChild('board')
  boardDiv: ElementRef<HTMLDivElement> = {} as ElementRef;

  @ViewChild('canvas') 
  canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  private ctx!: CanvasRenderingContext2D;
  
  private heightPx: number = 0;
  private widthPx: number = 0;
  private cellSize: number = -1;
  
  private images: Map<string, any> = new Map();

  constructor(private service: MinigameLiquidsortBottleService, private imageService: MinigameCommonImageService) {}

  ngAfterViewInit(): void {
    let nativ = this.canvas.nativeElement;
    this.calculateAndSetSizes(nativ);

    this.ctx = nativ.getContext('2d')!;

    this.loadImages();
    
    this.draw();
  }

  private loadImages() {
    this.loadSingleImage('liquidsort-bottle-empty');
    this.loadSingleImage('liquidsort-bottle-closed');
  }

  private loadSingleImage(key: string) {
    let obs = this.imageService.getImageForKey(key);
    obs.subscribe(res => {
      this.images.set(key, res);
      this.draw();
    });
  }
  
  private calculateAndSetSizes(nativ: HTMLCanvasElement) {
    let nativDiv = this.boardDiv.nativeElement;
    let divWidth = nativDiv.clientWidth;
    let divHeight = nativDiv.clientHeight;
    let divCellSize = this.calculateCellSize(MinigameLiquidsortBoardComponent.NB_CELLS, divHeight, divWidth);
    let allCellWidth = MinigameLiquidsortBoardComponent.NB_CELLS * divCellSize;
    let allCellHeight = MinigameLiquidsortBoardComponent.NB_CELLS * divCellSize;

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
  
  private draw() {
    this.ctx.clearRect(0, 0, this.widthPx, this.heightPx);
    
    this.service.bottles
      .forEach((b, idx) => {
        let boardX = Math.floor(idx / MinigameLiquidsortBoardComponent.NB_CELLS);
        let boardY = idx % MinigameLiquidsortBoardComponent.NB_CELLS;
        this.drawBottle(b, this.indexToPixel(boardY), this.indexToPixel(boardX), this.cellSize);
      })
  }

  private indexToPixel(idx: number) {
    return (idx + 0.5) * this.cellSize;
  }

  private drawBottle(bottle: MinigameLiquidSortBottle, boardY: number, boardX: number, size: number) {
    const bottleWidth = size * 0.4;
    const bottleHeight = size * 0.75;
    const left = boardY - bottleWidth / 2;
    const top = boardX - bottleHeight / 2 - (bottle.selected ? size * 0.05 : 0);
    const sideMargin = size * 0.01;
    const topMargin = bottleHeight * 0.3;
    const innerLeft = left + sideMargin;
    const innerTop = top + topMargin;
    const innerWidth = bottleWidth - sideMargin * 2;
    const innerHeight = bottleHeight * 0.6738;

    const bottleImg = this.images.get(`liquidsort-bottle-${bottle.isComplete() ? 'closed' : 'empty'}`);
    this.ctx.drawImage(bottleImg, left, top, bottleWidth, bottleHeight);

    if (bottle.liquids.length === 0) {
      return;
    }

    const liquidHeight = innerHeight / bottle.size;
    const bottomY = innerTop + innerHeight;

    bottle.liquids.toReversed().forEach((liquid, index) => {
      const liquidY = bottomY - index * liquidHeight - liquidHeight;
      this.ctx.fillStyle = liquid.color;
      this.ctx.fillRect(innerLeft, liquidY, innerWidth, liquidHeight);
    });
  }

  onBoardClick(event: MouseEvent): void {
    this.selectBottleAtClientPoint(event.clientX, event.clientY);
  }

  onBoardTouchEnd(event: TouchEvent): void {
    const touch = event.changedTouches.item(0);
    if (!touch) {
      return;
    }
    event.preventDefault();
    this.selectBottleAtClientPoint(touch.clientX, touch.clientY);
  }

  private selectBottleAtClientPoint(clientX: number, clientY: number): void {
    const previous = this.service.bottles.find(bottle => bottle.selected);
    
    this.service.bottles.forEach(bottle => bottle.selected = false);

    const selectedBottle = this.findBottleAtClientPoint(clientX, clientY);
    if (selectedBottle && !selectedBottle.isComplete()) {
      if (previous && previous !== selectedBottle) {
        if (previous.canPourInto(selectedBottle)) {
          const pouredBottles = previous.pourInto(selectedBottle);
          this.service.replaceBottle(previous, pouredBottles[0]);
          this.service.replaceBottle(selectedBottle, pouredBottles[1])
        } else {
          selectedBottle.selected = true;
        }
      } else {
        selectedBottle.selected = true;
      }
    }
    this.draw();
  }

  private findBottleAtClientPoint(clientX: number, clientY: number): MinigameLiquidSortBottle | null {
    const canvasRect = this.canvas.nativeElement.getBoundingClientRect();
    if (canvasRect.width === 0 || canvasRect.height === 0) {
      return null;
    }

    const relativeX = ((clientX - canvasRect.left) / canvasRect.width) * this.widthPx;
    const relativeY = ((clientY - canvasRect.top) / canvasRect.height) * this.heightPx;

    if (relativeX < 0 || relativeY < 0 || relativeX >= this.widthPx || relativeY >= this.heightPx) {
      return null;
    }

    const boardColumn = Math.floor(relativeX / this.cellSize);
    const boardRow = Math.floor(relativeY / this.cellSize);
    const bottleIndex = boardRow * MinigameLiquidsortBoardComponent.NB_CELLS + boardColumn;
    if (bottleIndex < 0 || bottleIndex >= this.service.bottles.length) {
      return null;
    }
    return this.service.bottles[bottleIndex];
  }
}
