import { TestBed } from '@angular/core/testing';

import { GlbLoaderResolver } from './glb-loader.resolver';

describe('GlbLoaderResolver', () => {
  let resolver: GlbLoaderResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GlbLoaderResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
