import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdventScenarioService } from '../advent-scenario.service';
import { AdventScenarioMemory } from '../shared/advent-scenario.model';

@Component({
  selector: 'app-advent-memory',
  templateUrl: './advent-memory.component.html',
  styleUrls: ['./advent-memory.component.css']
})
export class AdventMemoryComponent {
  prefix: string = "";
  width: number = 0;
  height: number = 0;
  private scenario!: AdventScenarioMemory;

  constructor(private route: ActivatedRoute, private scenarioService: AdventScenarioService) {
    this.route.paramMap.subscribe(map => {
      let id = map.get('id');
      if (id) {
        this.prefix = id;
        this.loadScenario(id);
      }
    });
  }

  loadScenario(id: string): void {
    this.scenario = this.scenarioService.loadScenarioMemory(id);
    this.width = this.scenario.width;
    this.height = this.scenario.height;
  }
}
