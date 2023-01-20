import { TestBed } from '@angular/core/testing';

import { MeilisearchService } from './meilisearch.service';

describe('MeilisearchService', () => {
  let service: MeilisearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeilisearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
