import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdventMemoryComponent } from './advent-memory/advent-memory.component';
import { AdventWordleComponent } from './advent-wordle/advent-wordle.component';

const routes: Routes = [
  { path: '', redirectTo: 'wordle', pathMatch: 'full' },
  { path: 'wordle', component: AdventWordleComponent },
  { path: 'memory', component: AdventMemoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
