import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MinigameMemoryService } from './minigame-memory.service';

@Component({
  selector: 'minigame-memory',
  templateUrl: './minigame-memory.component.html',
  styleUrls: ['./minigame-memory.component.css']
})
export class MinigameMemoryComponent implements OnInit {
  @Input() prefix: string = "";

  @Input() boardWidth: number = 0;
  @Input() boardHeight: number = 0;
  @Input() cardSetId: string = "";
  
  @Output() completionEvent = new EventEmitter<boolean>();

  bonus: number = MinigameMemoryService.BONUS_COUNT;
  get count(): number {
    return this.memoryService.count;
  }

  constructor(private memoryService: MinigameMemoryService) {}

  ngOnInit(): void {
    this.memoryService.prefix = this.prefix;
    this.memoryService.width = this.boardWidth;
    this.memoryService.height = this.boardHeight;
    this.memoryService.cardSetId = this.cardSetId;
    // Required for the callback in order to run in the right context (otherwise is the context of the caller, here the service)
    let that = this;
    this.memoryService.completionCallback = (bonus: boolean) => { that.completionEvent.emit(bonus); };
    this.memoryService.setupComplete();
  }
}
