import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MinigameWordleService } from './minigame-wordle.service';

@Component({
  selector: 'minigame-wordle',
  templateUrl: './minigame-wordle.component.html',
  styleUrls: ['./minigame-wordle.component.css']
})
export class MinigameWordleComponent implements OnInit {
  @Input() prefix: string = "";
  @Input() word: string[] = [];
  
  @Output() completionEvent = new EventEmitter<boolean>();

  @ViewChild("keyInput") _el!: ElementRef;

  constructor(private wordleService: MinigameWordleService) {}

  ngOnInit(): void {
    this.wordleService.setPrefix(this.prefix);
    this.wordleService.setWord(this.word);
    // Required for the callback in order to run in the right context (otherwise is the context of the caller, here the service)
    let that = this;
    this.wordleService.completionCallback = () => { that.completionEvent.emit(); };
  }
}
