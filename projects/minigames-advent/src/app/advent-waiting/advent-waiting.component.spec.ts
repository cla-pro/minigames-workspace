import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventWaitingComponent } from './advent-waiting.component';

describe('AdventWaitingComponent', () => {
  let component: AdventWaitingComponent;
  let fixture: ComponentFixture<AdventWaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventWaitingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdventWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
