import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdventScenarioService } from '../advent-scenario.service';
import { AdventScenarioMemory } from '../shared/advent-scenario.model';

@Component({
  selector: 'app-advent-memory',
  templateUrl: './advent-memory.component.html',
  styleUrls: ['./advent-memory.component.css']
})
export class AdventMemoryComponent {
  scenario!: AdventScenarioMemory;

  constructor(private route: ActivatedRoute, private router: Router, private scenarioService: AdventScenarioService) {
    this.route.paramMap.subscribe(map => {
      let id = map.get('id');
      if (id) {
        this.scenario = this.scenarioService.getScenarioMemory(id);
      }
    });
  }

  goToBoard(): void {
    this.router.navigate(['/']);
  }

  scenarioCompleted(bonus: boolean): void {
    this.scenario.completed = true;
    this.scenario.bonus = bonus;
    this.scenarioService.markCompleted(this.scenario);
    let that = this;
    setTimeout(function callback() {
      that.goToBoard();
    }, 2000);
  }
}
