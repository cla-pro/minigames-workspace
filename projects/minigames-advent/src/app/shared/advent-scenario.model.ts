import { MinigameFifteenPuzzlePiece } from "projects/minigame-fifteen-puzzle/src/lib/shared/minigame-fifteen-puzzle.model";
import { MinigameParkingjamCar } from "projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-car.model";
import { MinigameParkingjamWall } from "projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-wall.model";
import { MinigamePuzzlePiece } from "projects/minigame-puzzle/src/lib/shared/minigame-puzzle.model";

export class AdventScenario {
  prefix: string;
  type: string;
  completed: boolean;
  enabled: boolean;

  protected constructor(prefix: string, type: string) {
    this.prefix = prefix;
    this.type = type;
    this.completed = false;
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
  imageIds: string[];

  constructor(prefix: string, width: number, height: number, cardSetId: string) {
    super(prefix, "memory");
    this.width = width;
    this.height = height;
    this.cardSetId = cardSetId;
    this.imageIds = Array.from(Array(width * height / 2).keys()).map(i => `${cardSetId}-${i}`);
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
  puzzleSetId: string;
  width: number;
  height: number;
  piecesOnBoard: MinigamePuzzlePiece[];
  remainingPieces: MinigamePuzzlePiece[];

  constructor(prefix: string, width: number, height: number, puzzleSetId: string, piecesOnBoard: MinigamePuzzlePiece[], remainingPieces: MinigamePuzzlePiece[]) {
    super(prefix, "puzzle");
    this.width = width;
    this.height = height;
    this.puzzleSetId = puzzleSetId;
    this.piecesOnBoard = piecesOnBoard;
    this.remainingPieces = remainingPieces;
  }
}

export class AdventScenarioFifteenPuzzle extends AdventScenario {
  pieces: MinigameFifteenPuzzlePiece[];
  
  constructor(prefix: string, pieces: MinigameFifteenPuzzlePiece[]) {
    super(prefix, "fifteen-puzzle");
    this.pieces = pieces;
  }
}

export class AdventScenarioEmpty extends AdventScenario {
  constructor(prefix: string) {
    super(prefix, "unknown");
  }
}