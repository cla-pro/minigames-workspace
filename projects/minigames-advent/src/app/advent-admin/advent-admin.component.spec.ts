import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventAdminComponent } from './advent-admin.component';

describe('AdventAdminComponent', () => {
  let component: AdventAdminComponent;
  let fixture: ComponentFixture<AdventAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
