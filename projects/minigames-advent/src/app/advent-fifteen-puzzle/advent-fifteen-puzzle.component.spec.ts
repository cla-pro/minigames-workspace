import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventFifteenPuzzleComponent } from './advent-fifteen-puzzle.component';

describe('AdventFifteenPuzzleComponent', () => {
  let component: AdventFifteenPuzzleComponent;
  let fixture: ComponentFixture<AdventFifteenPuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventFifteenPuzzleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdventFifteenPuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
