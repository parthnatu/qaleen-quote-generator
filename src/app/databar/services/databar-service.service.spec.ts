import { TestBed } from '@angular/core/testing';

import { DatabarService } from './databar-service.service';

describe('DatabarServiceService', () => {
  let service: DatabarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
