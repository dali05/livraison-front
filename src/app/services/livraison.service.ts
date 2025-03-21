import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livraison } from '../models/livraison.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LivraisonService {
  private apiUrl = environment.apiUrl+'/livraisons';

  constructor(private http: HttpClient) {}

  getAllLivraisons(): Observable<Livraison[]> {
    return this.http.get<Livraison[]>(this.apiUrl);
  }

  createLivraison(produits: string[]): Observable<Livraison> {
    return this.http.post<Livraison>(this.apiUrl, produits);
  }

  choisirModeLivraison(id: number, modeLivraison: string): Observable<Livraison> {
    return this.http.post<Livraison>(`${this.apiUrl}/${id}/mode-livraison?modeLivraison=${modeLivraison}`, {});
  }

  choisirCreneau(id: number, creneauId: number): Observable<Livraison> {
    return this.http.post<Livraison>(`${this.apiUrl}/${id}/creneau-horaire`, { id: creneauId });
  }
}
