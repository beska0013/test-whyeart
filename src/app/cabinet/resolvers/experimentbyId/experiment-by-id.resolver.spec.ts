import { TestBed } from '@angular/core/testing';

import { ExperimentByIdResolver } from './experiment-by-id.resolver';

describe('ExperimentByIdResolver', () => {
  let resolver: ExperimentByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ExperimentByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
