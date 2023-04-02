import { TestBed } from '@angular/core/testing';

import { MinigameWordleService } from './minigame-wordle.service';

describe('MinigameWordleService', () => {
  let service: MinigameWordleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinigameWordleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
