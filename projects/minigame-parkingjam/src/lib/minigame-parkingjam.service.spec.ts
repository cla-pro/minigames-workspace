import { TestBed } from '@angular/core/testing';

import { MinigameParkingjamService } from './minigame-parkingjam.service';

describe('MinigameParkingjamService', () => {
  let service: MinigameParkingjamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinigameParkingjamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
