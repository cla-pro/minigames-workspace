import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdventWordleComponent } from './advent-wordle/advent-wordle.component';
import { MinigameWordleModule } from 'projects/minigame-wordle/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    AdventWordleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MinigameWordleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
