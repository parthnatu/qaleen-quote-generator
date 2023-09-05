import { TestBed } from '@angular/core/testing';

import { DocumentPreviewService } from './document-preview.service';

describe('DocumentPreviewService', () => {
  let service: DocumentPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
