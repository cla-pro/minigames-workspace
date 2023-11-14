import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventBoardScenarioComponent } from './advent-board-scenario.component';

describe('AdventBoardScenarioComponent', () => {
  let component: AdventBoardScenarioComponent;
  let fixture: ComponentFixture<AdventBoardScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventBoardScenarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventBoardScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
