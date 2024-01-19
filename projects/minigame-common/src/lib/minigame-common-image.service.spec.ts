import { TestBed } from '@angular/core/testing';

import { MinigameCommonImageService } from './minigame-common-image.service';

describe('MinigameCommonImageService', () => {
  let service: MinigameCommonImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinigameCommonImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
