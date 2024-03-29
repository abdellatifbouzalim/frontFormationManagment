import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../../models/Formation.model';
import { Adherent } from '../../models/Adherent.model';
import { AdherentRequest } from '../../models/AdherentRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8888';

  constructor(private http: HttpClient) { }

  getAllAdherents(): Observable<Adherent[]> {
    return this.http.get<Adherent[]>(`${this.baseUrl}/adherents`);
  }

  getAdherentById(id: number): Observable<Adherent> {
    return this.http.get<Adherent>(`${this.baseUrl}/adherents/${id}`);
  }

  addAdherent(adherent: Adherent): Observable<Adherent> {
    return this.http.post<Adherent>(`${this.baseUrl}/adherents`, adherent);
  }

  updateAdherent(id: number, adherent: Adherent): Observable<Adherent> {
    return this.http.put<Adherent>(`${this.baseUrl}/adherents/${id}`, adherent);
  }

  deleteAdherentFromFormation(formationId: number, adherentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/adherents/${formationId}/${adherentId}`);
  }
  

  getAdherentsByName(adherentName: string): Observable<Adherent[]> {


    
    return this.http.get<Adherent[]>(`${this.baseUrl}/adherents/search/${adherentName}`);
  }

  getAdherentsFormationById(formationId: number): Observable<Adherent[]> {
    return this.http.get<Adherent[]>(`${this.baseUrl}/adherents/formations/${formationId}`);
  
    console.log();
  
  }

  addNewAdherentToFormation(formationId: number, adherentAdd: AdherentRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/formations/${formationId}/adherents`, adherentAdd);
  }

  getAllFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.baseUrl}/formations`);
  }
}
