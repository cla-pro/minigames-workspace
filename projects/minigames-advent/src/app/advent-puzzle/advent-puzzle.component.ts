import { Component } from '@angular/core';
import { AdventScenarioPuzzle } from '../shared/advent-scenario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdventScenarioService } from '../advent-scenario.service';

@Component({
  selector: 'app-advent-puzzle',
  templateUrl: './advent-puzzle.component.html',
  styleUrl: './advent-puzzle.component.css'
})
export class AdventPuzzleComponent {
  scenario!: AdventScenarioPuzzle;

  constructor(private route: ActivatedRoute, private router: Router, private scenarioService: AdventScenarioService) {
    this.route.paramMap.subscribe(map => {
      let id = map.get('id');
      if (id) {
        this.scenario = this.scenarioService.getScenarioPuzzle(id);
      }
    });
  }

  goToBoard(): void {
    this.router.navigate(['/']);
  }

  scenarioCompleted(): void {
    console.log(`Scenario ${this.scenario.prefix} completed`)
    this.scenario.completed = true;
    this.scenarioService.markCompleted(this.scenario);
    let that = this;
    setTimeout(function callback() {
      that.goToBoard();
    }, 2000);
  }
}
