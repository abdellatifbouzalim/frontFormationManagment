import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdherentComponent } from './form-adherent.component';

describe('EditAdherentComponent', () => {
  let component: FormAdherentComponent;
  let fixture: ComponentFixture<FormAdherentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAdherentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAdherentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
