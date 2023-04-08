import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameParkingjamCellComponent } from './minigame-parkingjam-cell.component';

describe('MinigameParkingjamCellComponent', () => {
  let component: MinigameParkingjamCellComponent;
  let fixture: ComponentFixture<MinigameParkingjamCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinigameParkingjamCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinigameParkingjamCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
