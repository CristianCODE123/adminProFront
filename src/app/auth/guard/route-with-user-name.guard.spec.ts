import { TestBed } from '@angular/core/testing';

import { RouteWithUserNameGuard } from './route-with-user-name.guard';

describe('RouteWithUserNameGuard', () => {
  let guard: RouteWithUserNameGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RouteWithUserNameGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
