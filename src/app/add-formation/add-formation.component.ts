import { Component, OnInit } from '@angular/core';
import { Formation } from '../../models/Formation.model';
import { FormationService } from '../services/formation.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-formation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

  ],
  templateUrl: './add-formation.component.html',
  styleUrl: './add-formation.component.scss'

})


export class AddFormationComponent implements OnInit {

  newFormation!: any

  ngOnInit(): void {
this.newFormation = {
  id: 0,
  title: '',
  description: '',
  startDate: new Date(),
  endDate: new Date()
};

  }

  formSubmitted = false;

  constructor(private formationService: FormationService, private router: Router) {}

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.newFormation.title && this.newFormation.description && this.newFormation.startDate && this.newFormation.endDate) {
      this.formationService.addFormation(this.newFormation)
        .subscribe(
          (response) => {
            console.log('Formation added successfully:', response);
            this.clearForm();
            alert('Formation added successfully');
            this.router.navigate(['/formationList']);
          },
          (error) => {
            console.error('Error adding formation:', error);
            if (error && error.error && error.error.message) {
              alert('Error adding formation: ' + error.error.message);
            } else {
              alert('Error adding formation: Unknown error occurred');
            }
          }
        );
    } else {
      alert('Please fill in all required fields.');
    }
  }

  clearForm(): void {
    this.newFormation = {
      id: 0,
      title: '',
      description: '',
      startDate: new Date(),
      endDate: new Date()
    };
    this.formSubmitted = false;
  }
}