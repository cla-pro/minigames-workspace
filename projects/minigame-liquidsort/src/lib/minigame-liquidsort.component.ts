import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MinigameLiquidsortBottleService } from './minigame-liquidsort-bottle.service';

@Component({
  selector: 'minigame-liquidsort',
  templateUrl: './minigame-liquidsort.component.html',
  styleUrls: ['./minigame-liquidsort.component.css'],
  standalone: false
})
export class MinigameLiquidsortComponent implements OnInit {
  @Input() prefix: string = "";
  
  @Output() completionEvent = new EventEmitter<boolean>();

  constructor(private service: MinigameLiquidsortBottleService) {}
  
  ngOnInit(): void {
    this.service.prefix = this.prefix;
    let that = this;
    this.service.completionCallback = () => { that.completionEvent.emit(); };
    this.service.setupComplete();
  }
}
