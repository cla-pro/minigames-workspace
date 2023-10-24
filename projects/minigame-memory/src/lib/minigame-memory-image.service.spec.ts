import { TestBed } from '@angular/core/testing';

import { MinigameMemoryImageService } from './minigame-memory-image.service';

describe('MinigameMemoryImageService', () => {
  let service: MinigameMemoryImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinigameMemoryImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
