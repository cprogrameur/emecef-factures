import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MafactureComponent } from './mafacture.component';

describe('MafactureComponent', () => {
  let component: MafactureComponent;
  let fixture: ComponentFixture<MafactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MafactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MafactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
