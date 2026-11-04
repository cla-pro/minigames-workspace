import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameLiquidsortBoardComponent } from './minigame-liquidsort-board.component';

describe('MinigameLiquidsortBoardComponent', () => {
  let component: MinigameLiquidsortBoardComponent;
  let fixture: ComponentFixture<MinigameLiquidsortBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinigameLiquidsortBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinigameLiquidsortBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
