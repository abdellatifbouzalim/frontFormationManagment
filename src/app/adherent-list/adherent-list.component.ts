import { Component, Inject, OnInit } from '@angular/core';
import { Adherent } from '../../models/Adherent.model';
import { ApiService } from '../services/adherent.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-adherent-list',
  standalone: true,
  imports: [

    CommonModule
  ],
  templateUrl: './adherent-list.component.html',
  styleUrl: './adherent-list.component.scss'
})
export class AdherentListComponent implements OnInit {
  adherents: Adherent[] = [];
  formationId!: number;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.formationId = parseInt(params.get('Id') || '0');
     
        this.apiService.getAdherentsFormationById(this.formationId)
          .subscribe(data => {
  
            console.log("dataaaa" + data );
            this.adherents = data;
          });
    });
  } 

  addAdherent(): void {
    this.router.navigate(['/addAdherent', this.formationId]);
    
  }

  deleteAdherentFromFormation(formationId: number, adherentId: number): void {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet adhérent ?');
   
     console.log("------" +formationId + adherentId);
     
    if (confirmed) {
      this.apiService.deleteAdherentFromFormation(formationId, adherentId)
        .subscribe(() => {
          // Rafraîchir la liste des adhérents après suppression réussie
          this.loadAdherents();
          alert('Adhérent supprimé avec succès.');
        }, error => {
          console.error('Error deleting adherent from formation:', error);
          alert('Une erreur s\'est produite lors de la suppression de l\'adhérent.');
        });
    }
  }

  loadAdherents(): void {
    // Charger les adhérents associés à la formation actuelle
    this.apiService.getAdherentsFormationById(this.formationId)
      .subscribe(data => {
        this.adherents = data;
      }, error => {
        console.error('Error loading adherents:', error);
        alert('Une erreur s\'est produite lors du chargement des adhérents.');
      });
  }
  

  editAdherent(id: number): void {
   
    this.router.navigate(['/form-adherent', id]);
  }
  



}