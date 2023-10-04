import { TestBed } from '@angular/core/testing';

import { MinigamePuzzleService } from './minigame-puzzle.service';

describe('MinigamePuzzleService', () => {
  let service: MinigamePuzzleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinigamePuzzleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
