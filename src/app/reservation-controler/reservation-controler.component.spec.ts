import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationControlerComponent } from './reservation-controler.component';

describe('ReservationControlerComponent', () => {
  let component: ReservationControlerComponent;
  let fixture: ComponentFixture<ReservationControlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationControlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationControlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
