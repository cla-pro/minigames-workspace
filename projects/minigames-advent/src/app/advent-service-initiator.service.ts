import { Injectable } from '@angular/core';
import { AdventScenarioService } from './advent-scenario.service';
import { AdventScenarioMemory, AdventScenarioParkingjam, AdventScenarioPuzzle, AdventScenarioWordle } from './shared/advent-scenario.model';
import { MinigameParkingjamWall } from 'projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-wall.model';
import { MinigameParkingjamCar } from 'projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-car.model';

@Injectable({
  providedIn: 'root'
})
export class AdventServiceInitiatorService {

  constructor(private service: AdventScenarioService) { }

  initiateScenarios(): void {
    let walls = [
      // left wall
      this.wall(1, true, 0, 1, 0, 0),
      this.wall(2, true, 1, 2, 0, 0),
      this.wall(3, true, 2, 3, 0, 0),
      this.wall(4, true, 3, 4, 0, 0),
      this.wall(5, true, 4, 5, 0, 0),
      this.wall(6, true, 5, 6, 0, 0),
      this.wall(7, true, 6, 7, 0, 0),
      // right wall
      this.wall(8, true, 0, 1, 5, 5),
      this.wall(9, true, 1, 2, 5, 5),
      this.wall(10, true, 2, 3, 5, 5),
      this.wall(11, true, 3, 4, 5, 5),
      this.wall(12, true, 4, 5, 5, 5),
      this.wall(13, true, 6, 7, 5, 5),
      // upper wall
      this.wall(14, false, 0, 0, 0, 1),
      this.wall(15, false, 0, 0, 1, 2),
      this.wall(16, false, 0, 0, 2, 3),
      this.wall(17, false, 0, 0, 3, 4),
      this.wall(18, false, 0, 0, 4, 5),
      // lower wall
      this.wall(19, false, 7, 7, 0, 1),
      this.wall(20, false, 7, 7, 1, 2),
      this.wall(21, false, 7, 7, 2, 3),
      this.wall(22, false, 7, 7, 3, 4),
      this.wall(23, false, 7, 7, 4, 5),
      // inner walls
      this.wall(24, false, 1, 1, 1, 2),
      this.wall(25, false, 3, 3, 4, 5)
    ];

    let cars = [
      this.car(1, 5, 0, 2, false, '1x2-red-car-left-right.png', true),
      this.car(2, 2, 1, 3, true, '3x1-blue-truck-top-down.png', false),
      this.car(3, 3, 2, 3, false, '1x3-blue-truck-left-right.png', false),
      this.car(4, 5, 4, 2, true, '2x1-red-car-top-down.png', false)
    ];
    
    localStorage.clear();

    let firstScenario = new AdventScenarioWordle("2023-12-01", "GLACE");
    firstScenario.enabled = true;
    this.service.saveScenarios([
      firstScenario,
      new AdventScenarioParkingjam("2023-12-02", 5, 7, cars, walls),
      new AdventScenarioMemory("2023-12-03", 2, 2),
      new AdventScenarioWordle("2023-12-04", "ECOLE"),
      new AdventScenarioWordle("2023-12-05", "LUNDI"),
      //new AdventScenarioMemory("2023-12-06"),
      //new AdventScenarioParkingJam("2023-12-07"),
      new AdventScenarioWordle("2023-12-08", "TORDU"),
      new AdventScenarioWordle("2023-12-09", "PROMU"),
      //new AdventScenarioMemory("2023-12-10"),
      new AdventScenarioWordle("2023-12-11", "CYGNE"),
      new AdventScenarioWordle("2023-12-12", "OBJET"),
      new AdventScenarioWordle("2023-12-13", "GIVRE"),
      //new AdventScenarioParkingJam("2023-12-14"),
      //new AdventScenarioMemory("2023-12-15"),
      new AdventScenarioWordle("2023-12-16", "MAUVE"),
      //new AdventScenarioParkingJam("2023-12-17"),
      new AdventScenarioWordle("2023-12-18", "CHOUX"),
      //new AdventScenarioMemory("2023-12-19"),
      new AdventScenarioWordle("2023-12-20", "RUINE"),
      new AdventScenarioWordle("2023-12-21", "VACHE"),
      //new AdventScenarioMemory("2023-12-22"),
      //new AdventScenarioParkingJam("2023-12-23"),
      new AdventScenarioPuzzle("2023-12-24")
    ]);
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
}
