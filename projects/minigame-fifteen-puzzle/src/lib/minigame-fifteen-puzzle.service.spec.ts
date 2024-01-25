import { TestBed } from '@angular/core/testing';

import { MinigameFifteenPuzzleService } from './minigame-fifteen-puzzle.service';

describe('MinigameFifteenPuzzleService', () => {
  let service: MinigameFifteenPuzzleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinigameFifteenPuzzleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
