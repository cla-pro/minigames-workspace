import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameFifteenPuzzleBoardComponent } from './minigame-fifteen-puzzle-board.component';

describe('MinigameFifteenPuzzleBoardComponent', () => {
  let component: MinigameFifteenPuzzleBoardComponent;
  let fixture: ComponentFixture<MinigameFifteenPuzzleBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinigameFifteenPuzzleBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinigameFifteenPuzzleBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
