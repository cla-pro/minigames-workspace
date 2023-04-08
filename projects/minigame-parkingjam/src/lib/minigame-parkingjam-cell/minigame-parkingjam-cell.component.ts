import { Component, Input } from '@angular/core';
import { MinigameParkingjamCellstate } from '../shared/minigame-parkingjam-cellstate.model';

@Component({
  selector: 'minigame-parkingjam-cell',
  templateUrl: './minigame-parkingjam-cell.component.html',
  styleUrls: ['./minigame-parkingjam-cell.component.css']
})
export class MinigameParkingjamCellComponent {
  @Input() state: MinigameParkingjamCellstate = new MinigameParkingjamCellstate("EMPTY");
}
