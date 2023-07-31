import { TestBed } from '@angular/core/testing';

import { DataFacadeService } from './data-facade.service';

describe('DataFacadeService', () => {
  let service: DataFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
