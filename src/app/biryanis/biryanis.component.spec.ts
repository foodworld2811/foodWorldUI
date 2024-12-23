import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiryanisComponent } from './biryanis.component';

describe('BiryanisComponent', () => {
  let component: BiryanisComponent;
  let fixture: ComponentFixture<BiryanisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiryanisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiryanisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
