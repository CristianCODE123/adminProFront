import { TestBed } from '@angular/core/testing';

import { UserLiveGuardGuard } from './user-live-guard.guard';

describe('UserLiveGuardGuard', () => {
  let guard: UserLiveGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserLiveGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
