import { Component, OnInit } from '@angular/core';
import { LivraisonService } from '../../services/livraison.service';
import {Livraison, Produit} from '../../models/livraison.model';

@Component({
  selector: 'app-livraison-list',
  templateUrl: './livraison-list.component.html',
  styleUrls: ['./livraison-list.component.css'],
  standalone: false,
})
export class LivraisonListComponent implements OnInit {
  livraisons: Livraison[] = [];

  constructor(private livraisonService: LivraisonService) {}

  ngOnInit(): void {
    this.livraisonService.getAllLivraisons().subscribe(data => {
      this.livraisons = data;
    });
  }

  getProduitNoms(produits: Produit[]): string {
    return produits.map(p => p.nom).join(', ');
  }

}
