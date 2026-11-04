export class MinigameLiquidSortBottle {
  public selected: boolean = false;

  constructor(
    public id: number,
    public size: number,
    public liquids: MinigameLiquidSortLiquid[]) {}
  
  public isFull(): boolean {
    return this.liquids.length >= this.size;
  }

  public isComplete(): boolean {
    return this.isFull() && this.liquids.every(liquid => liquid.color === this.topLiquid().color);
  }

  public isEmpty(): boolean {
    return this.liquids.length === 0;
  }

  public canPourInto(destination: MinigameLiquidSortBottle): boolean {
    if (this.liquids.length === 0 || destination.isFull()) {
      return false;
    }
    if (destination.liquids.length === 0) {
      return true;
    }
    return this.topLiquid().color === destination.topLiquid().color;
  }

  public pourInto(destination: MinigameLiquidSortBottle): MinigameLiquidSortBottle[] {
    const color = this.topLiquid().color;
    const numberOfMatchingColor = this.liquids.findIndex(liquid => liquid.color !== color);
    // if numberOfMatchingColor is -1, it means all liquids match the destination color
    const pourableAmount = Math.min(destination.remainingCapacity(), numberOfMatchingColor === -1 ? this.liquids.length : numberOfMatchingColor);
    return [
      new MinigameLiquidSortBottle(this.id, this.size, this.liquids.slice(pourableAmount)),
      destination.withLiquid(this.liquids.slice(0, pourableAmount))
    ];
  }

  private topLiquid(): MinigameLiquidSortLiquid {
    return this.liquids[0];
  }

  private remainingCapacity(): number {
    return this.size - this.liquids.length;
  }

  private withLiquid(liquid: MinigameLiquidSortLiquid[]): MinigameLiquidSortBottle {
    return new MinigameLiquidSortBottle(this.id,this.size, [...liquid, ...this.liquids]);
  }
}

export class MinigameLiquidSortLiquid {
  constructor(public color: string) {}
}