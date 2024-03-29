// communication.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Formation } from '../../models/Formation.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private selectedFormationSource = new BehaviorSubject<Formation | null>(null);
  selectedFormation$ = this.selectedFormationSource.asObservable();

  constructor() {}

  selectFormation(formation: Formation): void {
    this.selectedFormationSource.next(formation);
  }
}
