import { TestBed } from '@angular/core/testing';

import { MainFuncService } from './main-func.service';

describe('MainFuncService', () => {
  let service: MainFuncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainFuncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
