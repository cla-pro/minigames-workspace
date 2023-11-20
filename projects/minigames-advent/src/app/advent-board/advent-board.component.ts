import { Component } from '@angular/core';
import { AdventScenario } from '../shared/advent-scenario.model';
import { Router } from '@angular/router';
import { AdventScenarioService } from '../advent-scenario.service';
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

  getScenario(prefix: string): AdventScenario {
    return this.scenarios.filter(s => s.prefix === prefix)[0];
  }

  resetScenario() {
    this.initiatorService.initiateScenarios();
    this.scenarios = this.service.loadScenarios();
  }

  startScenario(scenario: AdventScenario): void {
    this.router.navigate([scenario.type, scenario.prefix]);
  }

  enableAllScenario() {
    this.scenarios.forEach(s => s.enabled = true);
  }
}
