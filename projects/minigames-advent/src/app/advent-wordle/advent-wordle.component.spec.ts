import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventWordleComponent } from './advent-wordle.component';

describe('AdventWordleComponent', () => {
  let component: AdventWordleComponent;
  let fixture: ComponentFixture<AdventWordleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventWordleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventWordleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
