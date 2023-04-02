import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeancesSimpleListComponent } from './seances-simple-list.component';

describe('SeancesSimpleListComponent', () => {
  let component: SeancesSimpleListComponent;
  let fixture: ComponentFixture<SeancesSimpleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeancesSimpleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeancesSimpleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
