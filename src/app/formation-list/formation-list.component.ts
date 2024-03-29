import { Component, OnInit } from '@angular/core';
import { FormationService } from '../services/formation.service';
import { Formation } from '../../models/Formation.model';
import { CommonModule } from '@angular/common';
import { CommunicationService } from '../services/communication.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({

  selector: 'app-formation-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
    
  ],
  
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.scss']
})
export class FormationListComponent implements OnInit {

  formations: Formation[] = [];
  searchText: string = '';
  showConfirmation: boolean = false;
  formationIdToDelete: number = 0;

  constructor(
    private formationService: FormationService,
    private communicationService: CommunicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFormations();
  }

  getFormations(): void {
    this.formationService.getAllFormations()
      .subscribe(formations => this.formations = formations);
  }

  editFormation(id: number): void {

    console.log("......."+id)
    const selectedFormation = this.formations.find(f => f.id === id);

  
    if (selectedFormation) {
      this.communicationService.selectFormation(selectedFormation);
      this.router.navigate(['/edit-formation',id]);
    }
  }

  showAdherents(id: number): void {

    console.log("......."+id)
    const selectedFormation = this.formations.find(f => f.id === id);

  
    if (selectedFormation) {
      this.communicationService.selectFormation(selectedFormation);
      this.router.navigate(['/adherentList',id]);
    }
  }

  deleteFormation(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this formation?');
    if (confirmed) {
      this.formationService.deleteFormation(id)
        .subscribe(() => {
          this.formations = this.formations.filter(f => f.id !== id);
          alert('Formation deleted successfully');
        });
    }
  }

  searchFormations(): void {
    if (this.searchText.trim() === '') {
      this.loadAllFormations(); // Charger toutes les formations si le champ de recherche est vide
    } else {
      this.formationService.searchFormationsByTitle(this.searchText)
        .subscribe(formations => {
          this.formations = formations;
        });
    }
  }

  loadAllFormations(): void {
    this.formationService.getAllFormations()
      .subscribe(formations => {
        this.formations = formations;
      });
  }
  
}