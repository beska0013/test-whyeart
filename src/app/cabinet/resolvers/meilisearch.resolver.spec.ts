import { TestBed } from '@angular/core/testing';

import { MeilisearchResolver } from './meilisearch.resolver';

describe('MeilisearchResolver', () => {
  let resolver: MeilisearchResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MeilisearchResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
