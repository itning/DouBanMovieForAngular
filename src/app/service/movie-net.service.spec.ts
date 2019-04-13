import { TestBed } from '@angular/core/testing';

import { MovieNetService } from './movie-net.service';

describe('MovieNetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieNetService = TestBed.get(MovieNetService);
    expect(service).toBeTruthy();
  });
});
