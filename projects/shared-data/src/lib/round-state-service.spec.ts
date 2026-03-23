import { TestBed } from '@angular/core/testing';

import { RoundStateService } from './round-state-service';

describe('RoundStateService', () => {
  let service: RoundStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoundStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
