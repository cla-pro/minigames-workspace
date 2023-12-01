import { Component, Input, OnInit } from '@angular/core';
import { AdventScenario } from '../shared/advent-scenario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'advent-board-scenario',
  templateUrl: './advent-board-scenario.component.html',
  styleUrls: ['./advent-board-scenario.component.css']
})
export class AdventBoardScenarioComponent implements OnInit {
  @Input() scenario!: AdventScenario;
  day: string = '-99';

  constructor(private router: Router) {}

  ngOnInit(): void {
    let parsedDay = this.scenario.prefix.split('-')[2];
    this.day = `${+parsedDay}`.padStart(2, ' ');
  }

  startScenario(): void {
    if (this.scenario.enabled) {
      this.router.navigate([this.scenario.type, this.scenario.prefix]);
    }
  }
}
