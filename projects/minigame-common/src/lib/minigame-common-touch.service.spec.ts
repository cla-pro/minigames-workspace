import { TestBed } from '@angular/core/testing';

import { MinigameCommonTouchService } from './minigame-common-touch.service';

describe('MinigameCommonTouchService', () => {
  let service: MinigameCommonTouchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinigameCommonTouchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
