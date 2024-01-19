import { TestBed } from '@angular/core/testing';

import { MinigameCommonService } from './minigame-common.service';

describe('MinigameCommonService', () => {
  let service: MinigameCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinigameCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
