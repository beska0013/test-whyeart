import { TestBed } from '@angular/core/testing';

import { ExperimentsGuard } from './experiments.guard';

describe('ExperimentsGuard', () => {
  let guard: ExperimentsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExperimentsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
