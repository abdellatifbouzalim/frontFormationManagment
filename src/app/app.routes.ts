import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormationListComponent } from './formation-list/formation-list.component';
import { NgModule } from '@angular/core';
import { AddFormationComponent } from './add-formation/add-formation.component';
import { EditFormationComponent } from './edit-formation/edit-formation.component';
import { AdherentListComponent } from './adherent-list/adherent-list.component';
import { FormAdherentComponent } from './form-adherent/form-adherent.component';

export const routes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'formationList', component: FormationListComponent },
    { path: 'addFormation', component: AddFormationComponent },
    { path: 'edit-formation/:id', component: EditFormationComponent } ,
    { path: 'adherentList/:Id', component: AdherentListComponent },
    { path: 'addAdherent', component: FormAdherentComponent },
    { path: 'adherentList', component: AdherentListComponent },
    { path: 'addAdherent/:idFormation', component: FormAdherentComponent },


    { path: 'form-adherent/:id', component: FormAdherentComponent },];