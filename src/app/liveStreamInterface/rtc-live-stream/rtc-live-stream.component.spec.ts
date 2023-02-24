import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtcLiveStreamComponent } from './rtc-live-stream.component';

describe('RtcLiveStreamComponent', () => {
  let component: RtcLiveStreamComponent;
  let fixture: ComponentFixture<RtcLiveStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtcLiveStreamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RtcLiveStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
