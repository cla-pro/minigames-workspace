import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameWordleLineComponent } from './minigame-wordle-line.component';

describe('MinigameWordleLineComponent', () => {
  let component: MinigameWordleLineComponent;
  let fixture: ComponentFixture<MinigameWordleLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinigameWordleLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinigameWordleLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
