import { TestBed } from '@angular/core/testing';

import { ShinyAppResolver } from './shiny-app.resolver';

describe('ShinyAppResolver', () => {
  let resolver: ShinyAppResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ShinyAppResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
