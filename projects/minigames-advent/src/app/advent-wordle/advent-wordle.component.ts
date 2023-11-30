import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MinigameWordleComponent } from 'projects/minigame-wordle/src/public-api';
import { AdventScenarioService } from '../advent-scenario.service';
import { AdventScenarioWordle } from '../shared/advent-scenario.model';

@Component({
  selector: 'app-advent-wordle',
  templateUrl: './advent-wordle.component.html',
  styleUrls: ['./advent-wordle.component.css']
})
export class AdventWordleComponent {
  scenario!: AdventScenarioWordle;
  word: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private scenarioService: AdventScenarioService) {
    this.route.paramMap.subscribe(map => {
      let id = map.get('id');
      if (id) {
        this.scenario = this.scenarioService.getScenarioWordle(id);
        this.word = this.scenario.word.split('');
      }
    });
  }

  goToBoard(): void {
    this.router.navigate(['/']);
  }

  scenarioCompleted(bonus: boolean): void {
    console.log(`Scenario ${this.scenario.prefix} completed`)
    this.scenario.completed = true;
    this.scenario.bonus = bonus;
    this.scenarioService.markCompleted(this.scenario);
    let that = this;
    setTimeout(function callback() {
      that.goToBoard();
    }, 2000);
  }
}
