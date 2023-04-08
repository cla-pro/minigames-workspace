import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameParkingjamComponent } from './minigame-parkingjam.component';

describe('MinigameParkingjamComponent', () => {
  let component: MinigameParkingjamComponent;
  let fixture: ComponentFixture<MinigameParkingjamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinigameParkingjamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinigameParkingjamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
