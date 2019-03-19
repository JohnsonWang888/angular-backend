import { TestBed } from '@angular/core/testing';

import { MenuRestService } from './menu-rest.service';

describe('MenuRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuRestService = TestBed.get(MenuRestService);
    expect(service).toBeTruthy();
  });
});
