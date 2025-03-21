import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JourLivraison } from '../models/jour-livraison.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreneauService {
  private apiUrl = environment.apiUrl+'/creneaux';

  constructor(private http: HttpClient) {}

  getDatesDisponibles(modeLivraison: string): Observable<JourLivraison[]> {
    return this.http.get<JourLivraison[]>(`${this.apiUrl}/dates-disponibles?modeLivraison=${modeLivraison}`);
  }

  choisirCreneau(idLivraison: number, creneauId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${idLivraison}/creneau-horaire`, { id: creneauId });
  }
}
