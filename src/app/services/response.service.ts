import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private errorMessageSource = new BehaviorSubject<string>('');
  errorMessage$ = this.errorMessageSource.asObservable();

  private successMessageSource = new BehaviorSubject<string>('');
  successMessage$ = this.successMessageSource.asObservable();

  constructor() { }

  setErrorMessage(message: string): void {
    this.errorMessageSource.next(message);
  }

  setSuccessMessage(message: string): void {
    this.successMessageSource.next(message);
  }
}