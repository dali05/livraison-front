import {CreneauHoraire} from './creneau.model';

export interface Produit {
  id: number;
  nom: string;
}

export interface Livraison {
  id: number;
  modeLivraison: string;
  creneauHoraire?: CreneauHoraire;
  produits: Produit[];
}
