import { TestBed } from '@angular/core/testing';

import { DelonRestfulService } from './delon-restful.service';

describe('DelonRestfulService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DelonRestfulService = TestBed.get(DelonRestfulService);
    expect(service).toBeTruthy();
  });
});
