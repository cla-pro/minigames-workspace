import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdventWordleComponent } from './advent-wordle/advent-wordle.component';
import { AdventMemoryComponent } from './advent-memory/advent-memory.component';
import { MinigameWordleModule } from 'projects/minigame-wordle/src/public-api';
import { MinigameMemoryModule } from 'projects/minigame-memory/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    AdventWordleComponent,
    AdventMemoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MinigameWordleModule,
    MinigameMemoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
