import { TestBed, inject } from '@angular/core/testing';

import { HttpServerService } from './http-server.service';

describe('HttpServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpServerService]
    });
  });

  it('should be created', inject([HttpServerService], (service: HttpServerService) => {
    expect(service).toBeTruthy();
  }));
});
