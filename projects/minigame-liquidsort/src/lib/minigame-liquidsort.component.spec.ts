import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameLiquidsort } from './minigame-liquidsort.component';

describe('MinigameLiquidsort', () => {
  let component: MinigameLiquidsort;
  let fixture: ComponentFixture<MinigameLiquidsort>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinigameLiquidsort]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinigameLiquidsort);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
