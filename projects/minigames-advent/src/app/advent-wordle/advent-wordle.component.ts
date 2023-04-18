import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private scenarioService: AdventScenarioService) {
    this.route.paramMap.subscribe(map => {
      let id = map.get('id');
      if (id) {
        this.scenario = this.scenarioService.loadScenarioWordle(id);
        this.word = this.scenario.word.split('');
      }
    });
  }

  loadScenario(id: string): void {
  }

  scenarioCompleted(bonus: boolean): void {
    this.scenario.completed = true;
    this.scenario.bonus = bonus;
    this.scenarioService.saveScoreStatus(this.scenario);
  }
}
