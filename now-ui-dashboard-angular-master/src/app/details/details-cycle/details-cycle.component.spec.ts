import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCycleComponent } from './details-cycle.component';

describe('DetailsCycleComponent', () => {
  let component: DetailsCycleComponent;
  let fixture: ComponentFixture<DetailsCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCycleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
