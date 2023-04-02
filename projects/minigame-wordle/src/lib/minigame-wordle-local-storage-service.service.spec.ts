import { TestBed } from '@angular/core/testing';

import { MinigameWordleLocalStorageServiceService } from './minigame-wordle-local-storage-service.service';

describe('MinigameWordleLocalStorageServiceService', () => {
  let service: MinigameWordleLocalStorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinigameWordleLocalStorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
