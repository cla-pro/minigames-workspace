import { MinigameCommonImageService, Rectangle } from "projects/minigame-common/src/public-api";
import { MinigameParkingjamService } from "../minigame-parkingjam.service";
import { MinigameParkingjamConst } from "./minigame-parkingjam-const.model";

export class MinigameParkingjamCar {
  ctx!: CanvasRenderingContext2D;
  service!: MinigameParkingjamService;
  private _imageService!: MinigameCommonImageService;
  // position of the head of the car
  line: number = 0;
  column: number = 0;
  size: number = 0;
  vertical: boolean = false;
  imageName: string = 'no-name.png';
  required: boolean = false;

  // distance in pixel to the position before the movement started
  private rectangle: Rectangle = new Rectangle(0, 0, 0, 0);

  private offset: number = 0;
  private initialPosition = 0;
  private minOffset: number = 0;
  private maxOffset: number = 0;
  private _isOut: boolean = false;
  private image: any;

  public set imageService(imageService: MinigameCommonImageService) {
    this._imageService = imageService;
    let obs = this._imageService.getImageForKey(this.imageName);
    obs.subscribe(res => {
      this.image = res;
      this.draw();
    });
  }

  constructor(public id: number) { }

  mapToGrid() {
    let width = (this.vertical) ? 1 : this.size;
    let height = (this.vertical) ? this.size : 1;
    this.rectangle.x = MinigameParkingjamConst.cellToPixelWithPadding(this.column);
    this.rectangle.y = MinigameParkingjamConst.cellToPixelWithPadding(this.line);
    this.rectangle.width = MinigameParkingjamConst.cellToPixel(width);
    this.rectangle.height = MinigameParkingjamConst.cellToPixel(height);
  }

  clear() {
    let rect = this.getDisplayRectangle(this.offset);
    this.ctx.clearRect(
      rect.x,
      rect.y,
      rect.width,
      rect.height);
  }

  draw() {
    if (this.image !== undefined && this.ctx !== undefined) {
      this.ctx.save();
      let rect = this.getDisplayRectangle(this.offset);
      this.ctx.drawImage(this.image, rect.x, rect.y, rect.width, rect.height);
      this.ctx.restore();
    }
  }

  isPositionOnCar(x: number, y: number) {
    return this.rectangle.isInside(x, y);
  }

  onMouseClick(x: number, y: number) {
    this.service.startMoving(this);
    let bounds = this.service.rangeForMovement();
    let ref = this.vertical ? this.line : this.column;
    this.minOffset = MinigameParkingjamConst.cellToPixel(bounds[0] - ref);
    this.maxOffset = MinigameParkingjamConst.cellToPixel(bounds[1] - ref);
    this.initialPosition = (this.vertical) ? y : x;
  }

  onMouseMove(x: number, y: number) {
    this.clear();
    let newOffset = (this.vertical) ? y - this.initialPosition : x - this.initialPosition;
    this.offset = this.reduceToBounds(newOffset);
    this.draw();
  }

  onMouseRelease() {
    this.clear();
    if (this.vertical) {
      let y = this.rectangle.y + this.offset;
      this.line = MinigameParkingjamConst.pixelToCell(y);
    } else {
      let x = this.rectangle.x + this.offset;
      this.column = MinigameParkingjamConst.pixelToCell(x);
    }
    this.offset = 0;
    this.initialPosition = 0;
    this.service.movementComplete();
    if (!this._isOut) {
      this.mapToGrid();
      this.draw();
    }
  }

  public wentOut() {
    this._isOut = true;
    this.clear();
  }

  public isOut(): boolean {
    return this._isOut;
  }

  lines(): number[] {
    let s = (this.vertical) ? this.size : 1;
    return Array.from(Array(s).keys()).map(x => x + this.line);
  }

  columns(): number[] {
    let s = (this.vertical) ? 1 : this.size;
    return Array.from(Array(s).keys()).map(x => x + this.column);
  }

  reduceToBounds(newOffset: number): number {
    return Math.max(this.minOffset, Math.min(this.maxOffset, newOffset));
  }

  private getDisplayRectangle(offsetToAdd: number) {
    let offsetX = (this.vertical) ? 0 : offsetToAdd;
    let offsetY = (this.vertical) ? offsetToAdd : 0;
    return new Rectangle(
      this.rectangle.x + offsetX,
      this.rectangle.y + offsetY,
      this.rectangle.width,
      this.rectangle.height
    );
  }

  store(prefix: string): void {
    let base = prefix + '_' + this.id;
    localStorage.setItem(base + '_car_id', '' + this.id);
    localStorage.setItem(base + '_car_line', '' + this.line);
    localStorage.setItem(base + '_car_column', '' + this.column);
    localStorage.setItem(base + '_car_size', '' + this.size);
    localStorage.setItem(base + '_car_vertical', '' + this.vertical);
    localStorage.setItem(base + '_car_required', '' + this.required);
    localStorage.setItem(base + '_car_imageName', this.imageName);
  }

  // The id must be set in order to load the car
  load(prefix: string): MinigameParkingjamCar {
    let base = prefix + '_' + this.id;
    this.line = this.convertToNumberWithDefault(localStorage.getItem(base + "_car_line"), 0);
    this.column = this.convertToNumberWithDefault(localStorage.getItem(base + "_car_column"), 0);
    this.size = this.convertToNumberWithDefault(localStorage.getItem(base + "_car_size"), 1);
    this.vertical = localStorage.getItem(base + "_car_vertical") === "true";
    this.required = localStorage.getItem(base + "_car_required") === "true";
    let img = localStorage.getItem(base + "_car_imageName");
    this.imageName = (img) ? img : 'no-name.png';
    return this;
  }

  private convertToNumberWithDefault(text: string | null, defaultValue: number): number {
    return (text) ? +text : defaultValue;
  }
}