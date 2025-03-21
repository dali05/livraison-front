import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JourLivraison } from '../models/jour-livraison.model';

@Injectable({
  providedIn: 'root',
})
export class CreneauService {
  private apiUrl = 'http://localhost:8085/creneaux';

  constructor(private http: HttpClient) {}

  getDatesDisponibles(modeLivraison: string): Observable<JourLivraison[]> {
    return this.http.get<JourLivraison[]>(`${this.apiUrl}/dates-disponibles?modeLivraison=${modeLivraison}`);
  }

  choisirCreneau(idLivraison: number, creneauId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${idLivraison}/creneau-horaire`, { id: creneauId });
  }
}
