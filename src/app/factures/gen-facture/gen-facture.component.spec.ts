import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenFactureComponent } from './gen-facture.component';

describe('GenFactureComponent', () => {
  let component: GenFactureComponent;
  let fixture: ComponentFixture<GenFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
