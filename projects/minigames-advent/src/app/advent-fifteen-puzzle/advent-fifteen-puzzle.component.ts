import { Component, Input } from '@angular/core';
import { AdventScenarioService } from '../advent-scenario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-advent-fifteen-puzzle',
  templateUrl: './advent-fifteen-puzzle.component.html',
  styleUrl: './advent-fifteen-puzzle.component.css'
})
export class AdventFifteenPuzzleComponent {
  @Input() prefix: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private scenarioService: AdventScenarioService) {
    
  }
}