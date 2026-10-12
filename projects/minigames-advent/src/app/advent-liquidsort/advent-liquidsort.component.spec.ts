import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventLiquidsortComponent } from './advent-liquidsort.component';

describe('AdventLiquidsortComponent', () => {
  let component: AdventLiquidsortComponent;
  let fixture: ComponentFixture<AdventLiquidsortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventLiquidsortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventLiquidsortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
