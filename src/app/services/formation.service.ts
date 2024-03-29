import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Formation } from '../../models/Formation.model';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = 'http://localhost:8888/formations';

  constructor(private http: HttpClient) { }

  getAllFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  getFormationById(id: number): Observable<Formation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Formation>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  addFormation(formation: Formation): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.apiUrl, formation, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateFormation(id: number, formation: Formation): Observable<Formation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Formation>(url, formation)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  deleteFormation(id: number): Observable<string> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<string>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  searchFormationsByTitle(title: string): Observable<Formation[]> {
    const url = `${this.apiUrl}/search/${title}`;
    return this.http.get<Formation[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = error.error.message;
    } else if (error.status === 0) {
      // Erreur de connexion au serveur
      errorMessage = 'Could not connect to the server';
    } else {
      // Erreur renvoyée par le serveur avec le code d'erreur HTTP
      errorMessage = `Error ${error.status}: ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
