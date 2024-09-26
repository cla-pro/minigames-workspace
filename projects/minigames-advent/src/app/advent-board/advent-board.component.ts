import { Component } from '@angular/core';
import { AdventScenario, AdventScenarioEmpty } from '../shared/advent-scenario.model';
import { AdventScenarioService } from '../advent-scenario.service';
import { AdventServiceInitiatorService } from '../advent-service-initiator.service';

@Component({
  selector: 'app-advent-board',
  templateUrl: './advent-board.component.html',
  styleUrls: ['./advent-board.component.css']
})
export class AdventBoardComponent {
  scenarios: AdventScenario[] = [];
  numberedCells: string[][] = [
    ['2024-12-04', '2024-12-17', '2024-12-23', '2024-12-16'],
    ['2024-12-03', '2024-12-06', '2024-12-22', '2024-12-07'],
    ['2024-12-09', '2024-12-19', '2024-12-15', '2024-12-05'],
    ['2024-12-21', '2024-12-01', '2024-12-14', '2024-12-20'],
    ['2024-12-02', '2024-12-11', '2024-12-24', '2024-12-12'],
    ['2024-12-13', '2024-12-18', '2024-12-08', '2024-12-10']
  ];

  constructor(private service: AdventScenarioService, private initiatorService: AdventServiceInitiatorService) {
    this.initiatorService.initiateScenariosIfNotExisting();
    this.scenarios = this.service.loadScenarios();
  }

  getScenario(prefix: string): AdventScenario {
    let filtered = this.scenarios.filter(s => s.prefix === prefix);
    if (filtered.length === 0) {
      return new AdventScenarioEmpty(prefix);
    }
    return filtered[0];
  }

  clearScenario() {
    localStorage.clear();
  }

  reinitScenario() {
    this.initiatorService.initiateScenarios();
  }
}
