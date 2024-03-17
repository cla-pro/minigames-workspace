import { MinigameFifteenPuzzlePiece } from "projects/minigame-fifteen-puzzle/src/lib/shared/minigame-fifteen-puzzle.model";
import { MinigameParkingjamCar } from "projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-car.model";
import { MinigameParkingjamWall } from "projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-wall.model";

export class AdventScenario {
  prefix: string;
  type: string;
  completed: boolean;
  bonus: boolean;
  enabled: boolean;

  protected constructor(prefix: string, type: string) {
    this.prefix = prefix;
    this.type = type;
    this.completed = false;
    this.bonus = false;
    this.enabled = false;
  }
}

export class AdventScenarioWordle extends AdventScenario {
  word: string;

  constructor(prefix: string, word: string) {
    super(prefix, "wordle");
    this.word = word;
  }
}

export class AdventScenarioMemory extends AdventScenario {
  width: number;
  height: number;
  cardSetId: string;

  constructor(prefix: string, width: number, height: number, cardSetId: string) {
    super(prefix, "memory");
    this.width = width;
    this.height = height;
    this.cardSetId = cardSetId;
  }
}

export class AdventScenarioParkingjam extends AdventScenario {
  width: number;
  height: number;
  cars: MinigameParkingjamCar[];
  walls: MinigameParkingjamWall[];

  constructor(prefix: string, width: number, height: number, cars: MinigameParkingjamCar[], walls: MinigameParkingjamWall[]) {
    super(prefix, "parkingjam");
    this.width = width;
    this.height = height;
    this.cars = cars;
    this.walls = walls;
  }
}

export class AdventScenarioPuzzle extends AdventScenario {
  constructor(prefix: string) {
    super(prefix, "puzzle");
  }
}

export class AdventScenarioFifteenPuzzle extends AdventScenario {
  pieces: MinigameFifteenPuzzlePiece[];
  
  constructor(prefix: string, pieces: MinigameFifteenPuzzlePiece[]) {
    super(prefix, "fifteen-puzzle");
    this.pieces = pieces;
  }
}