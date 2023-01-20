import { TestBed } from '@angular/core/testing';

import { AllExperimentResolver } from './all-experiment.resolver';

describe('ExperimentResultResolver', () => {
  let resolver: AllExperimentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AllExperimentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
