import { TestBed, inject } from '@angular/core/testing';

import { SpentDataService } from './spent-data.service';

describe('SpentDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpentDataService]
    });
  });

  it('should be created', inject([SpentDataService], (service: SpentDataService) => {
    expect(service).toBeTruthy();
  }));
});
