import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventBoardComponent } from './advent-board.component';

describe('AdventBoardComponent', () => {
  let component: AdventBoardComponent;
  let fixture: ComponentFixture<AdventBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
