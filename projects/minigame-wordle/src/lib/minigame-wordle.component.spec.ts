import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameWordleComponent } from './minigame-wordle.component';

describe('MinigameWordleComponent', () => {
  let component: MinigameWordleComponent;
  let fixture: ComponentFixture<MinigameWordleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinigameWordleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinigameWordleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
