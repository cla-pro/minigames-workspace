import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameWordleLetterComponent } from './minigame-wordle-letter.component';

describe('MinigameWordleLetterComponent', () => {
  let component: MinigameWordleLetterComponent;
  let fixture: ComponentFixture<MinigameWordleLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinigameWordleLetterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinigameWordleLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
