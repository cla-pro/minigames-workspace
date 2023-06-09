import { MinigameParkingjamCar } from "projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-car.model";
import { MinigameParkingjamWall } from "projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-wall.model";

export class AdventScenario {
    prefix: string;
    type: string;
    completed: boolean;
    bonus: boolean;

    protected constructor(prefix: string, type: string) {
        this.prefix = prefix;
        this.type = type;
        this.completed = false;
        this.bonus = false;
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

    constructor(prefix: string, width: number, height: number) {
        super(prefix, "memory");
        this.width = width;
        this.height = height;
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