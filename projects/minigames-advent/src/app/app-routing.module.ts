import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdventMemoryComponent } from './advent-memory/advent-memory.component';
import { AdventWordleComponent } from './advent-wordle/advent-wordle.component';
import { AdventParkingjamComponent } from './advent-parkingjam/advent-parkingjam.component';
import { AdventBoardComponent } from './advent-board/advent-board.component';
import { AdventAdminComponent } from './advent-admin/advent-admin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AdventBoardComponent },
  { path: 'wordle', component: AdventWordleComponent },
  { path: 'wordle/:id', component: AdventWordleComponent },
  { path: 'memory', component: AdventMemoryComponent },
  { path: 'memory/:id', component: AdventMemoryComponent },
  { path: 'parkingjam', component: AdventParkingjamComponent },
  { path: 'parkingjam/:id', component: AdventParkingjamComponent },
  { path: 'admin', component: AdventAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
