import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AdventBoardComponent } from './advent-board/advent-board.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdventMemoryComponent } from './advent-memory/advent-memory.component';
import { AdventParkingjamComponent } from './advent-parkingjam/advent-parkingjam.component';
import { AdventWordleComponent } from './advent-wordle/advent-wordle.component';
import { MinigameMemoryModule } from 'projects/minigame-memory/src/public-api';
import { MinigameParkingjamModule } from 'projects/minigame-parkingjam/src/public-api';
import { MinigameWordleModule } from 'projects/minigame-wordle/src/public-api';
import { AdventBoardScenarioComponent } from './advent-board-scenario/advent-board-scenario.component';
import { AdventAdminComponent } from './advent-admin/advent-admin.component';
import { AdventPuzzleComponent } from './advent-puzzle/advent-puzzle.component';
import { MinigamePuzzleModule } from 'projects/minigame-puzzle/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    AdventWordleComponent,
    AdventMemoryComponent,
    AdventParkingjamComponent,
    AdventPuzzleComponent,
    AdventBoardComponent,
    AdventBoardScenarioComponent,
    AdventAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MinigameWordleModule,
    MinigameMemoryModule,
    MinigameParkingjamModule,
    MinigamePuzzleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
