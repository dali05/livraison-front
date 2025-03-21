import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JourLivraisonCreateDTO } from '../models/jour-livraison-create.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8085/admin/jours';

  constructor(private http: HttpClient) {}

  addJourLivraison(data: JourLivraisonCreateDTO): Observable<string> {
    return this.http.post(this.apiUrl, data, { responseType: 'text' });
  }
}
