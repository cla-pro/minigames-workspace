import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameMemoryBoardComponent } from './minigame-memory-board.component';

describe('MinigameMemoryBoardComponent', () => {
  let component: MinigameMemoryBoardComponent;
  let fixture: ComponentFixture<MinigameMemoryBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinigameMemoryBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinigameMemoryBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
