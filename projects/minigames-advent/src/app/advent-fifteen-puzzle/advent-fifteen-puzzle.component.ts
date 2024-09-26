import { Component, Input } from '@angular/core';
import { AdventScenarioService } from '../advent-scenario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdventScenarioFifteenPuzzle } from '../shared/advent-scenario.model';

@Component({
  selector: 'app-advent-fifteen-puzzle',
  templateUrl: './advent-fifteen-puzzle.component.html',
  styleUrl: './advent-fifteen-puzzle.component.css'
})
export class AdventFifteenPuzzleComponent {
  @Input() prefix: string = "";
  scenario!: AdventScenarioFifteenPuzzle;

  constructor(private route: ActivatedRoute, private router: Router, private scenarioService: AdventScenarioService) {
    this.route.paramMap.subscribe(map => {
      let id = map.get('id');
      if (id) {
        this.scenario = this.scenarioService.getScenarioFifteenPuzzle(id);
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
