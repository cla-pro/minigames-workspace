import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameFifteenPuzzleComponent } from './minigame-fifteen-puzzle.component';

describe('MinigameFifteenPuzzleComponent', () => {
  let component: MinigameFifteenPuzzleComponent;
  let fixture: ComponentFixture<MinigameFifteenPuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinigameFifteenPuzzleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinigameFifteenPuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
