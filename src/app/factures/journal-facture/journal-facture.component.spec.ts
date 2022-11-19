import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalFactureComponent } from './journal-facture.component';

describe('JournalFactureComponent', () => {
  let component: JournalFactureComponent;
  let fixture: ComponentFixture<JournalFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
