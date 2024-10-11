import { Injectable } from '@angular/core';
import { AdventScenarioService } from './advent-scenario.service';
import { AdventScenario, AdventScenarioFifteenPuzzle, AdventScenarioMemory, AdventScenarioParkingjam, AdventScenarioPuzzle, AdventScenarioWordle } from './shared/advent-scenario.model';
import { MinigameParkingjamWall } from 'projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-wall.model';
import { MinigameParkingjamCar } from 'projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-car.model';
import { MinigameFifteenPuzzlePiece } from 'projects/minigame-fifteen-puzzle/src/lib/shared/minigame-fifteen-puzzle.model';
import { MinigamePuzzlePiece } from 'projects/minigame-puzzle/src/lib/shared/minigame-puzzle.model';

@Injectable({
  providedIn: 'root'
})
export class AdventServiceInitiatorService {

  constructor(private service: AdventScenarioService) {
    let stored = localStorage.getItem('scenario-stored');
    if (stored !== 'true') {
      this.initiateScenarios();
    }
  }

  initiateScenariosIfNotExisting(): void {
    if (localStorage.getItem('scenario-stored') !== 'true') {
      this.initiateScenarios();
    }
  }

  initiateScenarios(): void {
    let group = localStorage.getItem('group');
    if (group !== null) {
      this.initiateScenariosWithGroup(group);
    }
  }

  private initiateScenariosWithGroup(group: string): void {
    localStorage.clear();
    localStorage.setItem('group', group);

    let scenarios: AdventScenario[] = [];
    switch (group) {
      case 'Benoist': { scenarios = this.createScenariosBenoist(); break; }
      case 'Lavanchy': { scenarios = this.createScenariosLavanchy(); break; }
      case 'Catry': { scenarios = this.createScenariosCatry(); break; }
      case 'Doudette': { scenarios = this.createScenariosDoudette(); break; }
    }
    scenarios[0].enabled = true;
    scenarios[1].enabled = true;
    scenarios[2].enabled = true;
    scenarios[3].enabled = true;
    scenarios[4].enabled = true;

    this.service.saveScenarios(scenarios);
    localStorage.setItem('scenario-stored', 'true');
  }

  private createScenariosBenoist(): AdventScenario[] {
    return [
      new AdventScenarioWordle("2024-12-01", "SAPIN"),
      this.puzzle("2024-12-02", "benoist-puzzle-1"),
      this.parkingjamNr1("2024-12-03"),
      this.puzzle15nr1("2024-12-04"),
      new AdventScenarioMemory("2024-12-05", 4, 6, "benoist-1"),
      new AdventScenarioWordle("2024-12-06", "MAGIE"),
      this.puzzle("2024-12-07", "benoist-puzzle-2"),
      this.parkingjamNr2("2024-12-08"),
      this.puzzle15nr2("2024-12-09"),
      new AdventScenarioMemory("2024-12-10", 4, 6, "benoist-2"),
      new AdventScenarioWordle("2024-12-11", "BOULE"),
      this.puzzle("2024-12-12", "benoist-puzzle-3"),
      this.parkingjamNr3("2024-12-13"),
      this.puzzle15nr3("2024-12-14"),
      new AdventScenarioMemory("2024-12-15", 4, 6, "benoist-3"),
      new AdventScenarioWordle("2024-12-16", "LUNDI"),
      this.puzzle("2024-12-17", "benoist-puzzle-4"),
      this.parkingjamNr4("2024-12-18"),
      this.puzzle15nr4("2024-12-19"),
      new AdventScenarioMemory("2024-12-20", 4, 6, "benoist-4"),
      new AdventScenarioWordle("2024-12-21", "PHOTO"),
      this.puzzle("2024-12-22", "benoist-puzzle-5"),
      this.parkingjamNr5("2024-12-23"),
      this.puzzle15nr5("2024-12-24")
    ];
  }

  private createScenariosLavanchy(): AdventScenario[] {
    return [
      new AdventScenarioWordle("2024-12-01", "SAPIN"),
      this.puzzle("2024-12-02", "lavanchy-puzzle-1"),
      this.parkingjamNr1("2024-12-03"),
      this.puzzle15nr1("2024-12-04"),
      new AdventScenarioMemory("2024-12-05", 4, 6, "lavanchy-1"),
      new AdventScenarioWordle("2024-12-06", "MAGIE"),
      this.puzzle("2024-12-07", "lavanchy-puzzle-2"),
      this.parkingjamNr2("2024-12-08"),
      this.puzzle15nr2("2024-12-09"),
      new AdventScenarioMemory("2024-12-10", 4, 6, "lavanchy-2"),
      new AdventScenarioWordle("2024-12-11", "BOULE"),
      this.puzzle("2024-12-12", "lavanchy-puzzle-3"),
      this.parkingjamNr3("2024-12-13"),
      this.puzzle15nr3("2024-12-14"),
      new AdventScenarioMemory("2024-12-15", 4, 6, "lavanchy-3"),
      new AdventScenarioWordle("2024-12-16", "LUNDI"),
      this.puzzle("2024-12-17", "lavanchy-puzzle-4"),
      this.parkingjamNr4("2024-12-18"),
      this.puzzle15nr4("2024-12-19"),
      new AdventScenarioMemory("2024-12-20", 4, 6, "lavanchy-4"),
      new AdventScenarioWordle("2024-12-21", "PHOTO"),
      this.puzzle("2024-12-22", "lavanchy-puzzle-5"),
      this.parkingjamNr5("2024-12-23"),
      this.puzzle15nr5("2024-12-24")
    ];
  }

  private createScenariosCatry(): AdventScenario[] {
    return [
      new AdventScenarioWordle("2024-12-01", "SAPIN"),
      this.puzzle("2024-12-02", "catry-puzzle-1"),
      this.parkingjamNr1("2024-12-03"),
      this.puzzle15nr1("2024-12-04"),
      new AdventScenarioMemory("2024-12-05", 4, 6, "catry-1"),
      new AdventScenarioWordle("2024-12-06", "MAGIE"),
      this.puzzle("2024-12-07", "catry-puzzle-2"),
      this.parkingjamNr2("2024-12-08"),
      this.puzzle15nr2("2024-12-09"),
      new AdventScenarioMemory("2024-12-10", 4, 6, "catry-2"),
      new AdventScenarioWordle("2024-12-11", "BOULE"),
      this.puzzle("2024-12-12", "catry-puzzle-3"),
      this.parkingjamNr3("2024-12-13"),
      this.puzzle15nr3("2024-12-14"),
      new AdventScenarioMemory("2024-12-15", 4, 6, "catry-3"),
      new AdventScenarioWordle("2024-12-16", "LUNDI"),
      this.puzzle("2024-12-17", "catry-puzzle-4"),
      this.parkingjamNr4("2024-12-18"),
      this.puzzle15nr4("2024-12-19"),
      new AdventScenarioMemory("2024-12-20", 4, 6, "catry-4"),
      new AdventScenarioWordle("2024-12-21", "PHOTO"),
      this.puzzle("2024-12-22", "catry-puzzle-5"),
      this.parkingjamNr5("2024-12-23"),
      this.puzzle15nr5("2024-12-24")
    ];
  }

  private createScenariosDoudette(): AdventScenario[] {
    return [
      new AdventScenarioWordle("2024-12-01", "SAPIN"),
      this.puzzle("2024-12-02", "doudette-puzzle-1"),
      this.parkingjamNr1("2024-12-03"),
      this.puzzle15nr1("2024-12-04"),
      new AdventScenarioMemory("2024-12-05", 4, 6, "doudette-1"),
      new AdventScenarioWordle("2024-12-06", "MAGIE"),
      this.puzzle("2024-12-07", "doudette-puzzle-2"),
      this.parkingjamNr2("2024-12-08"),
      this.puzzle15nr2("2024-12-09"),
      new AdventScenarioMemory("2024-12-10", 4, 6, "doudette-2"),
      new AdventScenarioWordle("2024-12-11", "BOULE"),
      this.puzzle("2024-12-12", "doudette-puzzle-3"),
      this.parkingjamNr3("2024-12-13"),
      this.puzzle15nr3("2024-12-14"),
      new AdventScenarioMemory("2024-12-15", 4, 6, "doudette-3"),
      new AdventScenarioWordle("2024-12-16", "LUNDI"),
      this.puzzle("2024-12-17", "doudette-puzzle-4"),
      this.parkingjamNr4("2024-12-18"),
      this.puzzle15nr4("2024-12-19"),
      new AdventScenarioMemory("2024-12-20", 4, 6, "doudette-4"),
      new AdventScenarioWordle("2024-12-21", "PHOTO"),
      this.puzzle("2024-12-22", "doudette-puzzle-5"),
      this.parkingjamNr5("2024-12-23"),
      this.puzzle15nr5("2024-12-24")
    ];
  }

  private wall(id: number, vertical: boolean, lineFrom: number, lineTo: number, columnFrom: number, columnTo: number) {
    let w = new MinigameParkingjamWall(id);
    w.vertical = vertical;
    w.lineFrom = lineFrom;
    w.lineTo = lineTo;
    w.columnFrom = columnFrom;
    w.columnTo = columnTo;
    return w;
  }

  private car(id: number, line: number, column: number, size: number, vertical: boolean, imageName: string, required: boolean) {
    let c = new MinigameParkingjamCar(id);
    c.line = line;
    c.column = column;
    c.size = size;
    c.vertical = vertical;
    c.imageName = imageName;
    c.required = required;
    return c;
  }

  private parkingjamNr1(prefix: string) {
    let cars = [
      this.car(1, 1, 0, 3, false, '1x3-blue-truck-right-left.png', false),
      this.car(2, 2, 0, 2, false, '1x2-red-car-left-right.png', true),
      this.car(3, 3, 0, 2, true, '2x1-green-truck-bottom-up.png', false),
      this.car(4, 2, 2, 2, true, '2x1-green-truck-top-down.png', false),
      this.car(5, 4, 1, 2, false, '1x2-green-truck-left-right.png', false),
      this.car(6, 0, 3, 2, true, '2x1-green-truck-top-down.png', false),
      this.car(7, 3, 3, 2, false, '1x2-green-truck-left-right.png', false),
      this.car(8, 4, 3, 2, true, '2x1-green-truck-bottom-up.png', false),
      this.car(9, 3, 5, 2, true, '2x1-green-truck-bottom-up.png', false),
      this.car(10, 5, 4, 2, false, '1x2-green-truck-right-left.png', false)
    ];

    return new AdventScenarioParkingjam(prefix, 6, 6, cars, this.parkingjamBorderWalls());
  }

  private parkingjamNr2(prefix: string) {
    let cars = [
      this.car(1, 1, 1, 3, false, '1x3-blue-truck-right-left.png', false),
      this.car(2, 0, 4, 3, true, '3x1-blue-truck-top-down.png', false),
      this.car(3, 2, 0, 2, false, '1x2-red-car-left-right.png', true),
      this.car(4, 2, 2, 2, true, '2x1-green-truck-top-down.png', false),
      this.car(5, 3, 3, 2, false, '1x2-green-truck-left-right.png', false),
      this.car(6, 4, 0, 3, false, '1x3-blue-truck-right-left.png', false),
      this.car(7, 4, 3, 2, true, '2x1-green-truck-top-down.png', false)
    ];

    return new AdventScenarioParkingjam(prefix, 6, 6, cars, this.parkingjamBorderWalls());
  }

  private parkingjamNr3(prefix: string) {
    let cars = [
      this.car(1, 0, 0, 2, false, '1x2-green-truck-left-right.png', false),
      this.car(2, 1, 0, 3, true, '3x1-blue-truck-top-down.png', false),
      this.car(3, 0, 2, 2, true, '2x1-green-truck-bottom-up.png', false),
      this.car(4, 2, 1, 2, false, '1x2-red-car-left-right.png', true),
      this.car(5, 0, 3, 3, true, '3x1-blue-truck-top-down.png', false),
      this.car(6, 4, 0, 3, false, '1x3-blue-truck-left-right.png', false),
      this.car(7, 3, 3, 3, false, '1x3-blue-truck-left-right.png', false),
      this.car(8, 5, 0, 2, false, '1x2-green-truck-right-left.png', false),
      this.car(9, 4, 4, 2, true, '2x1-green-truck-bottom-up.png', false),
      this.car(10, 4, 5, 2, true, '2x1-green-truck-bottom-up.png', false)
    ];

    return new AdventScenarioParkingjam(prefix, 6, 6, cars, this.parkingjamBorderWalls());
  }

  private parkingjamNr4(prefix: string) {
    let cars = [
      this.car(1, 0, 2, 2, true, '2x1-green-truck-bottom-up.png', false),
      this.car(2, 0, 3, 2, false, '1x2-green-truck-left-right.png', false),
      this.car(3, 0, 5, 2, true, '2x1-green-truck-bottom-up.png', false),
      this.car(4, 1, 3, 2, true, '2x1-green-truck-bottom-up.png', false),
      this.car(5, 1, 4, 2, true, '2x1-green-truck-bottom-up.png', false),
      this.car(6, 2, 5, 2, true, '2x1-green-truck-bottom-up.png', false),
      this.car(7, 2, 0, 3, false, '1x3-red-car-left-right.png', true),
      this.car(8, 3, 0, 3, true, '3x1-blue-truck-top-down.png', false),
      this.car(9, 4, 1, 2, true, '2x1-green-truck-bottom-up.png', false),
      this.car(10, 3, 1, 2, false, '1x2-green-truck-left-right.png', false),
      this.car(11, 3, 3, 2, false, '1x2-green-truck-left-right.png', false),
      this.car(12, 4, 4, 2, false, '1x2-green-truck-left-right.png', false),
      this.car(13, 5, 4, 2, false, '1x2-green-truck-left-right.png', false)
    ];

    return new AdventScenarioParkingjam(prefix, 6, 6, cars, this.parkingjamBorderWalls());
  }

  private parkingjamNr5(prefix: string) {
    let cars = [
      this.car(1, 0, 0, 2, false, '1x2-green-truck-left-right.png', false),
      this.car(2, 1, 0, 2, false, '1x2-green-truck-left-right.png', false),
      this.car(3, 2, 0, 3, false, '1x3-red-car-right-left.png', true),
      this.car(4, 3, 0, 3, true, '3x1-blue-truck-top-down.png', false),
      this.car(5, 1, 2, 2, false, '1x2-green-truck-left-right.png', false),
      this.car(6, 0, 3, 2, false, '1x2-green-truck-left-right.png', false),
      this.car(7, 2, 3, 2, true, '2x1-green-truck-bottom-up.png', false),
      this.car(8, 1, 4, 2, true, '2x1-green-truck-bottom-up.png', false),
      this.car(9, 0, 5, 3, true, '3x1-blue-truck-top-down.png', false),
      this.car(10, 3, 4, 2, false, '1x2-green-truck-left-right.png', false),
      this.car(11, 4, 1, 2, false, '1x2-green-truck-left-right.png', false),
      this.car(12, 5, 1, 3, false, '1x3-blue-truck-right-left.png', false),
      this.car(13, 4, 3, 2, false, '1x2-green-truck-left-right.png', false),
      this.car(14, 5, 4, 2, false, '1x2-green-truck-left-right.png', false)
    ];

    return new AdventScenarioParkingjam(prefix, 6, 6, cars, this.parkingjamBorderWalls());
  }

  private parkingjamBorderWalls(): MinigameParkingjamWall[] {
    return [
      // left wall
      this.wall(1, true, 0, 1, 0, 0),
      this.wall(2, true, 1, 2, 0, 0),
      this.wall(3, true, 2, 3, 0, 0),
      this.wall(4, true, 3, 4, 0, 0),
      this.wall(5, true, 4, 5, 0, 0),
      this.wall(6, true, 5, 6, 0, 0),
      // lower wall
      this.wall(7, false, 6, 6, 0, 1),
      this.wall(8, false, 6, 6, 1, 2),
      this.wall(9, false, 6, 6, 2, 3),
      this.wall(10, false, 6, 6, 3, 4),
      this.wall(11, false, 6, 6, 4, 5),
      this.wall(12, false, 6, 6, 5, 6),
      // right wall
      this.wall(13, true, 0, 1, 6, 6),
      this.wall(14, true, 1, 2, 6, 6),
      // - way out
      this.wall(16, true, 3, 4, 6, 6),
      this.wall(17, true, 4, 5, 6, 6),
      this.wall(18, true, 5, 6, 6, 6),
      // upper wall
      this.wall(19, false, 0, 0, 0, 1),
      this.wall(20, false, 0, 0, 1, 2),
      this.wall(21, false, 0, 0, 2, 3),
      this.wall(22, false, 0, 0, 3, 4),
      this.wall(23, false, 0, 0, 4, 5),
      this.wall(24, false, 0, 0, 5, 6)
    ];
  }

  private puzzle15nr1(prefix: string): AdventScenarioFifteenPuzzle {
    return new AdventScenarioFifteenPuzzle(prefix, [
        new MinigameFifteenPuzzlePiece(1, 0, 3, 0, 0),
        new MinigameFifteenPuzzlePiece(2, 2, 2, 0, 1),
        new MinigameFifteenPuzzlePiece(3, 3, 2, 0, 2),
        new MinigameFifteenPuzzlePiece(4, 1, 3, 0, 3),
        new MinigameFifteenPuzzlePiece(5, 1, 2, 1, 0),
        new MinigameFifteenPuzzlePiece(6, 2, 3, 1, 1),
        new MinigameFifteenPuzzlePiece(7, 2, 0, 1, 2),
        new MinigameFifteenPuzzlePiece(8, 1, 0, 1, 3),
        new MinigameFifteenPuzzlePiece(9, 2, 1, 2, 0),
        new MinigameFifteenPuzzlePiece(10, 0, 0, 2, 1),
        new MinigameFifteenPuzzlePiece(11, 0, 2, 2, 2),
        new MinigameFifteenPuzzlePiece(12, 3, 1, 2, 3),
        new MinigameFifteenPuzzlePiece(13, 3, 0, 3, 0),
        new MinigameFifteenPuzzlePiece(14, 0, 1, 3, 1),
        new MinigameFifteenPuzzlePiece(15, 1, 1, 3, 2)
      ]);
  }

  private puzzle15nr2(prefix: string): AdventScenarioFifteenPuzzle {
    return new AdventScenarioFifteenPuzzle(prefix, [
        new MinigameFifteenPuzzlePiece(1, 1, 1, 0, 0),
        new MinigameFifteenPuzzlePiece(2, 3, 0, 0, 1),
        new MinigameFifteenPuzzlePiece(3, 1, 2, 0, 2),
        new MinigameFifteenPuzzlePiece(4, 3, 2, 0, 3),
        new MinigameFifteenPuzzlePiece(5, 2, 2, 1, 0),
        new MinigameFifteenPuzzlePiece(6, 3, 1, 1, 1),
        new MinigameFifteenPuzzlePiece(7, 1, 0, 1, 2),
        new MinigameFifteenPuzzlePiece(8, 0, 3, 1, 3),
        new MinigameFifteenPuzzlePiece(9, 0, 1, 2, 0),
        new MinigameFifteenPuzzlePiece(10, 0, 0, 2, 1),
        new MinigameFifteenPuzzlePiece(11, 1, 3, 2, 2),
        new MinigameFifteenPuzzlePiece(12, 2, 0, 2, 3),
        new MinigameFifteenPuzzlePiece(13, 2, 1, 3, 0),
        new MinigameFifteenPuzzlePiece(14, 0, 2, 3, 1),
        new MinigameFifteenPuzzlePiece(15, 2, 3, 3, 2)
      ]);
  }

  private puzzle15nr3(prefix: string): AdventScenarioFifteenPuzzle {
    return new AdventScenarioFifteenPuzzle(prefix, [
        new MinigameFifteenPuzzlePiece(1, 2, 3, 0, 0),
        new MinigameFifteenPuzzlePiece(2, 1, 2, 0, 1),
        new MinigameFifteenPuzzlePiece(3, 3, 2, 0, 2),
        new MinigameFifteenPuzzlePiece(4, 2, 1, 0, 3),
        new MinigameFifteenPuzzlePiece(5, 3, 0, 1, 0),
        new MinigameFifteenPuzzlePiece(6, 0, 2, 1, 1),
        new MinigameFifteenPuzzlePiece(7, 1, 0, 1, 2),
        new MinigameFifteenPuzzlePiece(8, 2, 2, 1, 3),
        new MinigameFifteenPuzzlePiece(9, 0, 3, 2, 0),
        new MinigameFifteenPuzzlePiece(10, 0, 1, 2, 1),
        new MinigameFifteenPuzzlePiece(11, 1, 1, 2, 2),
        new MinigameFifteenPuzzlePiece(12, 1, 3, 2, 3),
        new MinigameFifteenPuzzlePiece(13, 3, 1, 3, 0),
        new MinigameFifteenPuzzlePiece(14, 0, 0, 3, 1),
        new MinigameFifteenPuzzlePiece(15, 2, 0, 3, 2)
      ]);
  }

  private puzzle15nr4(prefix: string): AdventScenarioFifteenPuzzle {
    return new AdventScenarioFifteenPuzzle(prefix, [
        new MinigameFifteenPuzzlePiece(1, 3, 2, 0, 0),
        new MinigameFifteenPuzzlePiece(2, 2, 3, 0, 1),
        new MinigameFifteenPuzzlePiece(3, 1, 3, 0, 2),
        new MinigameFifteenPuzzlePiece(4, 0, 1, 0, 3),
        new MinigameFifteenPuzzlePiece(5, 2, 1, 1, 0),
        new MinigameFifteenPuzzlePiece(6, 0, 2, 1, 1),
        new MinigameFifteenPuzzlePiece(7, 1, 0, 1, 2),
        new MinigameFifteenPuzzlePiece(8, 2, 2, 1, 3),
        new MinigameFifteenPuzzlePiece(9, 1, 2, 2, 0),
        new MinigameFifteenPuzzlePiece(10, 3, 0, 2, 1),
        new MinigameFifteenPuzzlePiece(11, 0, 0, 2, 2),
        new MinigameFifteenPuzzlePiece(12, 1, 1, 2, 3),
        new MinigameFifteenPuzzlePiece(13, 2, 0, 3, 0),
        new MinigameFifteenPuzzlePiece(14, 3, 1, 3, 1),
        new MinigameFifteenPuzzlePiece(15, 0, 3, 3, 2)
      ]);
  }

  private puzzle15nr5(prefix: string): AdventScenarioFifteenPuzzle {
    return new AdventScenarioFifteenPuzzle(prefix, [
        new MinigameFifteenPuzzlePiece(1, 2, 3, 0, 0),
        new MinigameFifteenPuzzlePiece(2, 3, 1, 0, 1),
        new MinigameFifteenPuzzlePiece(3, 0, 3, 0, 2),
        new MinigameFifteenPuzzlePiece(4, 1, 0, 0, 3),
        new MinigameFifteenPuzzlePiece(5, 1, 1, 1, 0),
        new MinigameFifteenPuzzlePiece(6, 2, 0, 1, 1),
        new MinigameFifteenPuzzlePiece(7, 1, 3, 1, 2),
        new MinigameFifteenPuzzlePiece(8, 0, 2, 1, 3),
        new MinigameFifteenPuzzlePiece(9, 0, 1, 2, 0),
        new MinigameFifteenPuzzlePiece(10, 3, 0, 2, 1),
        new MinigameFifteenPuzzlePiece(11, 0, 0, 2, 2),
        new MinigameFifteenPuzzlePiece(12, 2, 2, 2, 3),
        new MinigameFifteenPuzzlePiece(13, 1, 2, 3, 0),
        new MinigameFifteenPuzzlePiece(14, 2, 1, 3, 1),
        new MinigameFifteenPuzzlePiece(15, 3, 2, 3, 2)
      ]);
  }

  private puzzle(prefix: string, setId: string): AdventScenarioPuzzle {
    return new AdventScenarioPuzzle(
      prefix,
      4,
      6,
      setId,
      [],
      [
        new MinigamePuzzlePiece(11, -1, -1, 0, 0),
        new MinigamePuzzlePiece(12, -1, -1, 0, 1),
        new MinigamePuzzlePiece(13, -1, -1, 0, 2),
        new MinigamePuzzlePiece(14, -1, -1, 0, 3),
        new MinigamePuzzlePiece(21, -1, -1, 1, 0),
        new MinigamePuzzlePiece(22, -1, -1, 1, 1),
        new MinigamePuzzlePiece(23, -1, -1, 1, 2),
        new MinigamePuzzlePiece(24, -1, -1, 1, 3),
        new MinigamePuzzlePiece(31, -1, -1, 2, 0),
        new MinigamePuzzlePiece(32, -1, -1, 2, 1),
        new MinigamePuzzlePiece(33, -1, -1, 2, 2),
        new MinigamePuzzlePiece(34, -1, -1, 2, 3),
        new MinigamePuzzlePiece(41, -1, -1, 3, 0),
        new MinigamePuzzlePiece(42, -1, -1, 3, 1),
        new MinigamePuzzlePiece(43, -1, -1, 3, 2),
        new MinigamePuzzlePiece(44, -1, -1, 3, 3),
        new MinigamePuzzlePiece(51, -1, -1, 4, 0),
        new MinigamePuzzlePiece(52, -1, -1, 4, 1),
        new MinigamePuzzlePiece(53, -1, -1, 4, 2),
        new MinigamePuzzlePiece(54, -1, -1, 4, 3),
        new MinigamePuzzlePiece(61, -1, -1, 5, 0),
        new MinigamePuzzlePiece(62, -1, -1, 5, 1),
        new MinigamePuzzlePiece(63, -1, -1, 5, 2),
        new MinigamePuzzlePiece(64, -1, -1, 5, 3)]
    )
  }
}
