import { Injectable, NgModule } from '@angular/core';
import { CanActivate, Router, RouterModule, Routes } from '@angular/router';
import { AdventMemoryComponent } from './advent-memory/advent-memory.component';
import { AdventWordleComponent } from './advent-wordle/advent-wordle.component';
import { AdventParkingjamComponent } from './advent-parkingjam/advent-parkingjam.component';
import { AdventBoardComponent } from './advent-board/advent-board.component';
import { AdventAdminComponent } from './advent-admin/advent-admin.component';
import { AdventGroupChooserComponent } from './advent-group-chooser/advent-group-chooser.component';
import { AdventFifteenPuzzleComponent } from './advent-fifteen-puzzle/advent-fifteen-puzzle.component';
import { AdventPuzzleComponent } from './advent-puzzle/advent-puzzle.component';
import { AdventScenarioService } from './advent-scenario.service';
import { AdventWaitingComponent } from './advent-waiting/advent-waiting.component';
import { AdventLiquidsortComponent } from './advent-liquidsort/advent-liquidsort.component';

@Injectable({providedIn: 'root'})
export class AdventGuards implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (this.isWaitingGuard()) {
      return this.router.parseUrl('/waiting');
    } else if (this.isGroupNotSetGuard()) {
      return this.router.parseUrl('/group-chooser');
    }
    return true;
  }

  isWaitingGuard() {
    return new Date().getTime() < AdventScenarioService.FIRST_DECEMBER;
  }

  isGroupNotSetGuard() {
    return localStorage.getItem('group') === null;
  }
}

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AdventBoardComponent, canActivate: [AdventGuards] },
  { path: 'wordle', component: AdventWordleComponent },
  { path: 'wordle/:id', component: AdventWordleComponent },
  { path: 'memory', component: AdventMemoryComponent },
  { path: 'memory/:id', component: AdventMemoryComponent },
  { path: 'parkingjam', component: AdventParkingjamComponent },
  { path: 'parkingjam/:id', component: AdventParkingjamComponent },
  { path: 'fifteen-puzzle', component: AdventFifteenPuzzleComponent },
  { path: 'fifteen-puzzle/:id', component: AdventFifteenPuzzleComponent },
  { path: 'puzzle', component: AdventPuzzleComponent },
  { path: 'puzzle/:id', component: AdventPuzzleComponent },
  { path: 'liquidsort', component: AdventLiquidsortComponent },
  { path: 'liquidsort/:id', component: AdventLiquidsortComponent }, 
  { path: 'admin', component: AdventAdminComponent },
  { path: 'group-chooser', component: AdventGroupChooserComponent },
  { path: 'waiting', component: AdventWaitingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
