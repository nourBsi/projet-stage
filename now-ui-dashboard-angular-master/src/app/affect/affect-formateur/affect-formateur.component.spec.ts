import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectFormateurComponent } from './affect-formateur.component';

describe('AffectFormateurComponent', () => {
  let component: AffectFormateurComponent;
  let fixture: ComponentFixture<AffectFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
