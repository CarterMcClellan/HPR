import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { StudiesComponent } from './studies/studies.component';
import { MyStudiesComponent } from './my-studies/my-studies.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { PickerComponent } from './picker/picker.component';

const routes: Routes = [
  { path: '', redirectTo: '/studies', pathMatch: 'full' },
  { path: 'studies', component:  StudiesComponent},
  { path: 'mystudies', component:  MyStudiesComponent},
  { path: 'login', component:  LoginComponent},
  { path: 'signup', component:  SignupComponent},
  { path: 'schedule', component:  SchedulerComponent },
  { path: 'picker', component: PickerComponent}
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
