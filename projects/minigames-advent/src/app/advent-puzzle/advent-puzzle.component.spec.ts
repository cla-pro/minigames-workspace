import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventPuzzleComponent } from './advent-puzzle.component';

describe('AdventPuzzleComponent', () => {
  let component: AdventPuzzleComponent;
  let fixture: ComponentFixture<AdventPuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventPuzzleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdventPuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
