import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameMemoryComponent } from './minigame-memory.component';

describe('MinigameMemoryComponent', () => {
  let component: MinigameMemoryComponent;
  let fixture: ComponentFixture<MinigameMemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinigameMemoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinigameMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
