import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameParkingjamBoardComponent } from './minigame-parkingjam-board.component';

describe('MinigameParkingjamBoardComponent', () => {
  let component: MinigameParkingjamBoardComponent;
  let fixture: ComponentFixture<MinigameParkingjamBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinigameParkingjamBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinigameParkingjamBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
