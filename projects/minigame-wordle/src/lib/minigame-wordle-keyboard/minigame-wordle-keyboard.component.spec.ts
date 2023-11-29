import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameWordleKeyboardComponent } from './minigame-wordle-keyboard.component';

describe('MinigameWordleKeyboardComponent', () => {
  let component: MinigameWordleKeyboardComponent;
  let fixture: ComponentFixture<MinigameWordleKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinigameWordleKeyboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinigameWordleKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
