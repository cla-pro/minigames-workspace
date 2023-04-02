import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdventWordleComponent } from './advent-wordle/advent-wordle.component';

const routes: Routes = [
  { path: '', redirectTo: 'wordle', pathMatch: 'full' },
  { path: 'wordle', component: AdventWordleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
