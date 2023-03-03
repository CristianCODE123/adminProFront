import { TestBed } from '@angular/core/testing';

import { AuthBridgeService } from './auth-bridge.service';

describe('AuthBridgeService', () => {
  let service: AuthBridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthBridgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
