import { Component } from '@angular/core';
import { AdventScenario } from '../shared/advent-scenario.model';
import { AdventServiceInitiatorService } from '../advent-service-initiator.service';
import { AdventScenarioService } from '../advent-scenario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'advent-admin',
  templateUrl: './advent-admin.component.html',
  styleUrls: ['./advent-admin.component.css']
})
export class AdventAdminComponent {
  scenarios: AdventScenario[] = [];

  constructor(private router: Router, private service: AdventScenarioService, private initiatorService: AdventServiceInitiatorService) {}
  
  resetScenario() {
    this.initiatorService.initiateScenarios();
    this.scenarios = this.service.loadScenarios();
  }

  enableAllScenario() {
    this.scenarios.forEach(s => s.enabled = true);
  }
}
