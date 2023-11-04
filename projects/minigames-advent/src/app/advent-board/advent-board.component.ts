import { Component } from '@angular/core';
import { AdventScenario, AdventScenarioMemory, AdventScenarioParkingjam, AdventScenarioPuzzle, AdventScenarioWordle } from '../shared/advent-scenario.model';
import { Router } from '@angular/router';
import { AdventScenarioService } from '../advent-scenario.service';
import { MinigameParkingjamWall } from 'projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-wall.model';
import { MinigameParkingjamCar } from 'projects/minigame-parkingjam/src/lib/shared/minigame-parkingjam-car.model';
import { AdventServiceInitiatorService } from '../advent-service-initiator.service';

@Component({
  selector: 'app-advent-board',
  templateUrl: './advent-board.component.html',
  styleUrls: ['./advent-board.component.css']
})
export class AdventBoardComponent {
  scenarios: AdventScenario[] = [];

  constructor(private router: Router, private service: AdventScenarioService, private initiatorService: AdventServiceInitiatorService) {
    this.scenarios = this.service.loadScenarios();
  }

  resetScenario() {
    this.initiatorService.initiateScenarios();
  }

  startScenario(scenario: AdventScenario): void {
    this.router.navigate([scenario.type, scenario.prefix]);
  }
}
