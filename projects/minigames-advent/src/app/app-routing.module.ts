import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdventMemoryComponent } from './advent-memory/advent-memory.component';
import { AdventWordleComponent } from './advent-wordle/advent-wordle.component';
import { AdventParkingjamComponent } from './advent-parkingjam/advent-parkingjam.component';
import { AdventBoardComponent } from './advent-board/advent-board.component';
import { AdventAdminComponent } from './advent-admin/advent-admin.component';
import { AdventGroupChooserComponent } from './advent-group-chooser/advent-group-chooser.component';
import { AdventFifteenPuzzleComponent } from './advent-fifteen-puzzle/advent-fifteen-puzzle.component';

export function isGroupSetGuard() {
  return localStorage.getItem('group') !== null;
}

export function IsGroupNotSetGuard() {
  return !isGroupSetGuard();
}

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AdventBoardComponent, canMatch: [isGroupSetGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'group-chooser', canMatch: [IsGroupNotSetGuard] },
  { path: 'wordle', component: AdventWordleComponent },
  { path: 'wordle/:id', component: AdventWordleComponent },
  { path: 'memory', component: AdventMemoryComponent },
  { path: 'memory/:id', component: AdventMemoryComponent },
  { path: 'parkingjam', component: AdventParkingjamComponent },
  { path: 'parkingjam/:id', component: AdventParkingjamComponent },
  { path: 'fifteen-puzzle', component: AdventFifteenPuzzleComponent },
  { path: 'fifteen-puzzle/:id', component: AdventFifteenPuzzleComponent },
  { path: 'admin', component: AdventAdminComponent },
  { path: 'group-chooser', component: AdventGroupChooserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
