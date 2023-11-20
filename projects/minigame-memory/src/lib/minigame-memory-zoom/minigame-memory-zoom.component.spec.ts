import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameMemoryZoomComponent } from './minigame-memory-zoom.component';

describe('MinigameMemoryZoomComponent', () => {
  let component: MinigameMemoryZoomComponent;
  let fixture: ComponentFixture<MinigameMemoryZoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinigameMemoryZoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinigameMemoryZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
