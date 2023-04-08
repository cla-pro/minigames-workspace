import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventParkingjamComponent } from './advent-parkingjam.component';

describe('AdventParkingjamComponent', () => {
  let component: AdventParkingjamComponent;
  let fixture: ComponentFixture<AdventParkingjamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventParkingjamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventParkingjamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
