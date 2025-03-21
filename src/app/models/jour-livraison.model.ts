import {CreneauHoraire} from './creneau.model';

export interface JourLivraison {
  date: string;
  creneaux: CreneauHoraire[];
}
