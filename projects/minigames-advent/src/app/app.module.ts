import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdventWordleComponent } from './advent-wordle/advent-wordle.component';
import { AdventMemoryComponent } from './advent-memory/advent-memory.component';
import { MinigameWordleModule } from 'projects/minigame-wordle/src/public-api';
import { MinigameMemoryModule } from 'projects/minigame-memory/src/public-api';
import { AdventParkingjamComponent } from './advent-parkingjam/advent-parkingjam.component';
import { MinigameParkingjamModule } from 'projects/minigame-parkingjam/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    AdventWordleComponent,
    AdventMemoryComponent,
    AdventParkingjamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MinigameWordleModule,
    MinigameMemoryModule,
    MinigameParkingjamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
