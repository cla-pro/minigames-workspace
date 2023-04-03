import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventMemoryComponent } from './advent-memory.component';

describe('AdventMemoryComponent', () => {
  let component: AdventMemoryComponent;
  let fixture: ComponentFixture<AdventMemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventMemoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
