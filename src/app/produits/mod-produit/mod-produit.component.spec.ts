import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModProduitComponent } from './mod-produit.component';

describe('ModProduitComponent', () => {
  let component: ModProduitComponent;
  let fixture: ComponentFixture<ModProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
