import { Component } from '@angular/core';
import { AdventScenario, AdventScenarioMemory, AdventScenarioParkingjam, AdventScenarioWordle } from '../shared/advent-scenario.model';
import { Router } from '@angular/router';
import { AdventScenarioService } from '../advent-scenario.service';

@Component({
  selector: 'app-advent-board',
  templateUrl: './advent-board.component.html',
  styleUrls: ['./advent-board.component.css']
})
export class AdventBoardComponent {
  scenarios: AdventScenario[] = [];

  constructor(private router: Router, private scenarioService: AdventScenarioService) {
    // localStorage.clear();
    // this.scenarioService.saveScenarios([
    //   new AdventScenarioWordle("2023-12-01", "AVION"),
    //   new AdventScenarioMemory("2023-12-02", 6, 2),
    //   new AdventScenarioParkingjam("2023-12-03")
    // ]);
    this.scenarios = this.scenarioService.loadScenarios();
  }

  startScenario(scenario: AdventScenario): void {
    this.router.navigate([scenario.type, scenario.prefix]);
  }
}
