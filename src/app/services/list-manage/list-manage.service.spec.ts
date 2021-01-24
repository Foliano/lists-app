import { TestBed } from '@angular/core/testing';

import { ListManageService } from './list-manage.service';

describe('ListManageService', () => {
  let service: ListManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
