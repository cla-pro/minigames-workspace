import { Component } from '@angular/core';
import { map, Observable, shareReplay, timer } from 'rxjs';
import { AdventScenarioService } from '../advent-scenario.service';

@Component({
  selector: 'app-advent-waiting',
  standalone: true,
  imports: [],
  templateUrl: './advent-waiting.component.html',
  styleUrl: './advent-waiting.component.css'
})
export class AdventWaitingComponent {
  hours = 0;
  minutes = 0;
  seconds = 0;

  constructor() {
    timer(0, 1000).subscribe(_ => {
      let t = AdventScenarioService.FIRST_DECEMBER - new Date().getTime();
      this.hours = Math.floor(t / 3_600_000);
      this.minutes = Math.floor((t - this.hours * 3_600_000) / 60_000);
      this.seconds = Math.floor((t - this.hours * 3_600_000 - this.minutes * 60_000) / 1_000);
    });
  }
}
