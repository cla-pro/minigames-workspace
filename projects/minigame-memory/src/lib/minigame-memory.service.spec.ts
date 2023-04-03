import { TestBed } from '@angular/core/testing';

import { MinigameMemoryService } from './minigame-memory.service';

describe('MinigameMemoryService', () => {
  let service: MinigameMemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinigameMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
