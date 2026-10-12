import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdventScenarioService } from '../advent-scenario.service';
import { AdventScenarioLiquidsort } from '../shared/advent-scenario.model';

@Component({
  selector: 'app-advent-liquidsort',
  templateUrl: './advent-liquidsort.component.html',
  styleUrl: './advent-liquidsort.component.css',
  standalone: false
})
export class AdventLiquidsortComponent {
  scenario!: AdventScenarioLiquidsort;

  constructor(private route: ActivatedRoute, private router: Router, private scenarioService: AdventScenarioService) {
    this.route.paramMap.subscribe(map => {
      let id = map.get('id');
      if (id) {
        this.scenario = this.scenarioService.getScenarioLiquidsort(id);
      }
    });
  }

  goToBoard(): void {
    this.router.navigate(['/']);
  }

  scenarioCompleted(): void {
    this.scenario.completed = true;
    this.scenarioService.markCompleted(this.scenario);
    let that = this;
    setTimeout(function callback() {
      that.goToBoard();
    }, 2000);
  }
}
