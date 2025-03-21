import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJourLivraisonComponent } from './admin-jour-livraison.component';

describe('AdminJourLivraisonComponent', () => {
  let component: AdminJourLivraisonComponent;
  let fixture: ComponentFixture<AdminJourLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminJourLivraisonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJourLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
