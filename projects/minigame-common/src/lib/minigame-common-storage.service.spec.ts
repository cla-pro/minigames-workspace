import { TestBed } from '@angular/core/testing';

import { MinigameCommonStorageService } from './minigame-common-storage.service';

describe('MinigameCommonStorageService', () => {
  let service: MinigameCommonStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinigameCommonStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
