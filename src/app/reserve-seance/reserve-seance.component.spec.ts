import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveSeanceComponent } from './reserve-seance.component';

describe('ReserveSeanceComponent', () => {
  let component: ReserveSeanceComponent;
  let fixture: ComponentFixture<ReserveSeanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveSeanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
