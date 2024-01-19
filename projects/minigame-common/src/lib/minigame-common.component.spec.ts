import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameCommonComponent } from './minigame-common.component';

describe('MinigameCommonComponent', () => {
  let component: MinigameCommonComponent;
  let fixture: ComponentFixture<MinigameCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinigameCommonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinigameCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
