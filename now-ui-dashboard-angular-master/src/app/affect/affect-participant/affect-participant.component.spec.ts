import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectParticipantComponent } from './affect-participant.component';

describe('AffectParticipantComponent', () => {
  let component: AffectParticipantComponent;
  let fixture: ComponentFixture<AffectParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
