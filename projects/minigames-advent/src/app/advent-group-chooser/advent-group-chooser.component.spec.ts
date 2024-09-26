import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventGroupChooserComponent } from './advent-group-chooser.component';

describe('AdventGroupChooserComponent', () => {
  let component: AdventGroupChooserComponent;
  let fixture: ComponentFixture<AdventGroupChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventGroupChooserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdventGroupChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
