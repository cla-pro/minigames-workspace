import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameMemoryCardComponent } from './minigame-memory-card.component';

describe('MinigameMemoryCardComponent', () => {
  let component: MinigameMemoryCardComponent;
  let fixture: ComponentFixture<MinigameMemoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinigameMemoryCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinigameMemoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
