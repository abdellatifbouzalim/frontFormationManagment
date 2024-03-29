import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/adherent.service';
import { Adherent } from '../../models/Adherent.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdherentRequest } from '../../models/AdherentRequest.model';

@Component({
  selector: 'app-form-adherent',
  templateUrl: './form-adherent.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./form-adherent.component.scss']
})
export class FormAdherentComponent implements OnInit {
  formSubmitted = false;
  adherentId!: number;
  adherent: Adherent = {
    id: 0,
    firstName: '',
    lastName: ''
  };
  adherentAdd: AdherentRequest = {
    firstName: '',
    lastName: ''
  };
  previousPageId: number | null = null; 
  formationId: number | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adherentService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.adherentId = idParam ? Number(idParam) : 0;
      this.previousPageId = Number(params.get('previousPageId')); 
      if (this.adherentId) {
        this.loadAdherent(); 
      }
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('idFormation');
      this.formationId = idParam ? Number(idParam) : undefined;
    });
  }

  loadAdherent(): void {
    this.adherentService.getAdherentById(this.adherentId).subscribe(
      (data: Adherent) => {
        this.adherent = data;
      },
      (error) => {
        console.error('Error loading adherent:', error);
        alert('Error loading adherent: ' + error.message);
      }
    );
  }

  submitForm(): void {
    
      if (this.adherentId) {
        // Mode édition
        this.adherentService.updateAdherent(this.adherentId, this.adherent)
          .subscribe(
            () => {
              console.log('Adherent updated successfully');
              this.clearForm();
              alert('Adherent updated successfully');
              this.router.navigate(['/formationList']);
            },
            (error) => {
              console.error('Error updating adherent:', error);
              alert('Error updating adherent: ' + error.message);
            }
          );
      } else {
        // Mode ajout
        console.log("----"+this.adherentAdd);
        this.adherentService.addNewAdherentToFormation(this.formationId!, this.adherentAdd)
          .subscribe(
            () => {
              console.log('Adherent added successfully to formation');
              this.clearForm();
              alert('Adherent added successfully to formation');
              this.router.navigate(['/formationList']);
            },
            (error) => {
              console.error('Error adding adherent to formation:', error);
              alert('Error adding adherent to formation: ' + error.message);
            }
          );
      }

  }
  
  

  updateAdherent(): void {
    this.adherentService.updateAdherent(this.adherentId, this.adherent).subscribe(
      () => {
        console.log('Adherent updated successfully');
        this.clearForm();
        alert('Adherent updated successfully');
        if (this.previousPageId) {
          // Naviguer vers la page précédente avec l'ID dynamique
          this.router.navigate(['/adherentList', this.previousPageId]);
        } else {
          this.router.navigate(['/adherentList']);
        }
      },
      (error) => {
        console.error('Error updating adherent:', error);
        alert('Error updating adherent: ' + error.message);
      }
    );
  }

  clearForm(): void {
    this.adherent = {
      id: 0,
      firstName: '',
      lastName: ''
    };
    this.formSubmitted = false;
  }
}
