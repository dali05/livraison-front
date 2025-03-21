import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { JourLivraisonCreateDTO } from '../../models/jour-livraison-create.model';

@Component({
  selector: 'app-admin-jour-livraison',
  templateUrl: './admin-jour-livraison.component.html',
  styleUrls: ['./admin-jour-livraison.component.css'],
  standalone: false,
})
export class AdminJourLivraisonComponent {
  date: string = '';
  modeLivraison: string = 'DRIVE';
  creneaux: string[] = [];
  creneauInput: string = '';
  message: string = '';

  constructor(private adminService: AdminService) {}

  addCreneau() {
    if (this.creneauInput) {
      this.creneaux.push(this.creneauInput);
      this.creneauInput = '';
    }
  }

  removeCreneau(index: number) {
    this.creneaux.splice(index, 1);
  }

  submitJour() {
    const data: JourLivraisonCreateDTO = {
      date: this.date,
      modeLivraison: this.modeLivraison,
      creneaux: this.creneaux
    };
    this.adminService.addJourLivraison(data).subscribe({
      next: (res) => this.message = '✅ ' + res,
      error: (err) => this.message = '❌ Erreur : ' + err.error
    });
  }
}
