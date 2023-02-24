import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivestreamInterfaceComponent } from './livestream-interface.component';

describe('LivestreamInterfaceComponent', () => {
  let component: LivestreamInterfaceComponent;
  let fixture: ComponentFixture<LivestreamInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivestreamInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivestreamInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
