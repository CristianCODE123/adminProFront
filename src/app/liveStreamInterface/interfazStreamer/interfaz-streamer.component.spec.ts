import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfazStreamerComponent } from './interfaz-streamer.component';

describe('InterfazStreamerComponent', () => {
  let component: InterfazStreamerComponent;
  let fixture: ComponentFixture<InterfazStreamerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfazStreamerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfazStreamerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
