import { Injectable } from '@angular/core';
import { AdventScenarioService } from './advent-scenario.service';
import { AdventScenarioMemory, AdventScenarioParkingjam, AdventScenarioPuzzle, AdventScenarioWordle } from './shared/advent-scenario.model';
import { MinigameParkingjamWall } from 'projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-wall.model';
import { MinigameParkingjamCar } from 'projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-car.model';

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

  initiateScenarios(): void {
    localStorage.clear();

    let firstScenario = new AdventScenarioWordle("2023-12-01", "GLACE");
    firstScenario.enabled = true;
    this.service.saveScenarios([
      firstScenario,
      this.parkingjamScenario1(),
      new AdventScenarioMemory("2023-12-03", 4, 6, "firstSet"),
      new AdventScenarioWordle("2023-12-04", "ECOLE"),
      new AdventScenarioWordle("2023-12-05", "LUNDI"),
      new AdventScenarioMemory("2023-12-06", 4, 6, "secondSet"),
      this.parkingjamScenario2(),
      new AdventScenarioWordle("2023-12-08", "TORDU"),
      new AdventScenarioWordle("2023-12-09", "PROMU"),
      new AdventScenarioMemory("2023-12-10", 4, 6, "thirdSet"),
      new AdventScenarioWordle("2023-12-11", "CYGNE"),
      new AdventScenarioWordle("2023-12-12", "OBJET"),
      new AdventScenarioWordle("2023-12-13", "GIVRE"),
      this.parkingjamScenario3(),
      new AdventScenarioMemory("2023-12-15", 4, 6, "fourthSet"),
      new AdventScenarioWordle("2023-12-16", "MAUVE"),
      this.parkingjamScenario4(),
      new AdventScenarioWordle("2023-12-18", "CHOUX"),
      new AdventScenarioMemory("2023-12-19", 4, 6, "fifthSet"),
      new AdventScenarioWordle("2023-12-20", "RUINE"),
      new AdventScenarioWordle("2023-12-21", "VACHE"),
      new AdventScenarioMemory("2023-12-22", 4, 6, "sixthSet"),
      this.parkingjamScenario5(),
      new AdventScenarioWordle("2023-12-24", "AMOUR")
    ]);
    localStorage.setItem('scenario-stored', 'true');
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

  private parkingjamScenario1() {
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

    return new AdventScenarioParkingjam("2023-12-02", 6, 6, cars, this.parkingjamBorderWalls(), 8);
  }

  private parkingjamScenario2() {
    let cars = [
      this.car(1, 1, 1, 3, false, '1x3-blue-truck-right-left.png', false),
      this.car(2, 0, 4, 3, true, '3x1-blue-truck-top-down.png', false),
      this.car(3, 2, 0, 2, false, '1x2-red-car-left-right.png', true),
      this.car(4, 2, 2, 2, true, '2x1-green-truck-top-down.png', false),
      this.car(5, 3, 3, 2, false, '1x2-green-truck-left-right.png', false),
      this.car(6, 4, 0, 3, false, '1x3-blue-truck-right-left.png', false),
      this.car(7, 4, 3, 2, true, '2x1-green-truck-top-down.png', false)
    ];

    return new AdventScenarioParkingjam("2023-12-07", 6, 6, cars, this.parkingjamBorderWalls(), 15);
  }

  private parkingjamScenario3() {
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

    return new AdventScenarioParkingjam("2023-12-14", 6, 6, cars, this.parkingjamBorderWalls(), 15);
  }

  private parkingjamScenario4() {
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

    return new AdventScenarioParkingjam("2023-12-17", 6, 6, cars, this.parkingjamBorderWalls(), 15);
  }

  private parkingjamScenario5() {
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

    return new AdventScenarioParkingjam("2023-12-23", 6, 6, cars, this.parkingjamBorderWalls(), 20);
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
}
