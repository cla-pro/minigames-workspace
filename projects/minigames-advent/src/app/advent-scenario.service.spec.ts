import { TestBed } from '@angular/core/testing';

import { AdventScenarioService } from './advent-scenario.service';

describe('AdventScenarioService', () => {
  let service: AdventScenarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdventScenarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
