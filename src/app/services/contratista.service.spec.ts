import { TestBed } from '@angular/core/testing';

import { ContratistaService } from './contratista.service';

describe('ContratistaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContratistaService = TestBed.get(ContratistaService);
    expect(service).toBeTruthy();
  });
});
