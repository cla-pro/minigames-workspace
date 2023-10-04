import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigamePuzzleComponent } from './minigame-puzzle.component';

describe('MinigamePuzzleComponent', () => {
  let component: MinigamePuzzleComponent;
  let fixture: ComponentFixture<MinigamePuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinigamePuzzleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinigamePuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
