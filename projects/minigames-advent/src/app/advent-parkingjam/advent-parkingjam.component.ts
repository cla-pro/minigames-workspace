import { Component } from '@angular/core';
import { AdventScenarioParkingjam } from '../shared/advent-scenario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdventScenarioService } from '../advent-scenario.service';

@Component({
  selector: 'app-advent-parkingjam',
  templateUrl: './advent-parkingjam.component.html',
  styleUrls: ['./advent-parkingjam.component.css']
})
export class AdventParkingjamComponent {
  scenario!: AdventScenarioParkingjam;

  constructor(private route: ActivatedRoute, private router: Router, private scenarioService: AdventScenarioService) {
    this.route.paramMap.subscribe(map => {
      let id = map.get('id');
      if (id) {
        this.scenario = this.scenarioService.getScenarioParkingjam(id);
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
