import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigamePuzzleBoardComponent } from './minigame-puzzle-board.component';

describe('MinigamePuzzleBoardComponent', () => {
  let component: MinigamePuzzleBoardComponent;
  let fixture: ComponentFixture<MinigamePuzzleBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinigamePuzzleBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinigamePuzzleBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
