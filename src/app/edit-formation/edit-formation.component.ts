import { Component, OnInit } from '@angular/core';
import { Formation } from '../../models/Formation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from '../services/formation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-formation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './edit-formation.component.html',
  styleUrl: './edit-formation.component.scss'
})
export class EditFormationComponent implements OnInit {
  formSubmitted = false;
  formationId: number = 0;
  formation: Formation = {
    id: 0,
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date()
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formationService: FormationService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.formationId = Number(params.get('id'));
      this.formationService.getFormationById(this.formationId).subscribe(data => {
        this.formation = data;

      })
    });
  }



  updateFormation(): void {
    this.formSubmitted = true;

    if (this.formation.title && this.formation.description && this.formation.startDate && this.formation.endDate) {
      this.formationService.updateFormation(this.formationId, this.formation)
        .subscribe(
          (response) => {
            console.log('Formation updated successfully:', response);
            this.clearForm();
            alert('Formation updated successfully');
            this.router.navigate(['/formationList']);

          },
          (error) => {
            console.error('Error updating formation:', error);
            alert('Error updating formation: ' + (error?.error?.message));
          }
        );
    } else {
      alert('Please fill in all required fields.');
    }
  }


  clearForm(): void {
    this.formation = {
      id: 0,
      title: '',
      description: '',
      startDate: new Date(),
      endDate: new Date()
    };
    this.formSubmitted = false;
  }
}