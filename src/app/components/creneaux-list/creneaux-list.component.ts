import { Component, Input, OnInit } from '@angular/core';
import { CreneauService } from '../../services/creneau.service';
import { LivraisonService } from '../../services/livraison.service';
import { JourLivraison } from '../../models/jour-livraison.model';
import {Livraison} from '../../models/livraison.model';
import {ProduitService} from '../../services/produit.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-creneaux-list',
  templateUrl: './creneaux-list.component.html',
  styleUrls: ['./creneaux-list.component.css'],
  standalone: false,
})
export class CreneauxListComponent implements OnInit {

  produits: any[] = [];
  selectedProduits: string[] = [];
  livraison?: Livraison;
  message: string = '';

  modeLivraison: string = '';
  modes: string[] = ['DRIVE', 'DELIVERY', 'DELIVERY_TODAY', 'DELIVERY_ASAP'];

  jours: JourLivraison[] = [];
  messageCreneau: string = '';

  constructor(
    private produitService: ProduitService,
    private livraisonService: LivraisonService,
    private creneauService: CreneauService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.produitService.getProduits().subscribe(data => this.produits = data);
  }

  onProductChange(event: any, produitNom: string) {
    if (event.target.checked) {
      this.selectedProduits.push(produitNom);
    } else {
      this.selectedProduits = this.selectedProduits.filter(p => p !== produitNom);
    }
  }

  createLivraison() {
    this.livraisonService.createLivraison(this.selectedProduits).subscribe({
      next: res => {
        this.livraison = res;
        this.message = 'Livraison créée avec ID : ' + res.id;
      },
      error: err => {
        this.message = 'Erreur : ' + err.error;
      }
    });
  }

  choisirModeLivraison() {
    if (!this.livraison?.id || !this.modeLivraison) return;
    this.livraisonService.choisirModeLivraison(this.livraison.id, this.modeLivraison).subscribe({
      next: res => {
        this.message = 'Mode de livraison mis à jour.';
        this.loadCreneaux();
      },
      error: err => {
        this.message = 'Erreur mise à jour mode livraison : ' + err.error;
      }
    });
  }

  loadCreneaux() {
    this.creneauService.getDatesDisponibles(this.modeLivraison).subscribe(data =>
      this.jours = data);
    this.router.navigate(['/livraisons']);
  }

  reserverCreneau(creneauId: number) {
    if (!this.livraison?.id) return;
    this.livraisonService.choisirCreneau(this.livraison.id, creneauId).subscribe({
      next: res => {
        this.messageCreneau = 'Créneau réservé avec succès !';
        this.loadCreneaux();
      },
      error: err => {
        this.messageCreneau = 'Erreur réservation : ' + err.error;
      }
    });
  }
}
