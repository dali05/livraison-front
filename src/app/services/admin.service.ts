import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JourLivraisonCreateDTO } from '../models/jour-livraison-create.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
   private apiUrl =  environment.apiUrl+'/admin/jours';

  constructor(private http: HttpClient) {}

  addJourLivraison(data: JourLivraisonCreateDTO): Observable<string> {
    return this.http.post(this.apiUrl, data, { responseType: 'text' });
  }
}
