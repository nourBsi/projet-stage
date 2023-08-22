import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { ProfileGuard } from '../profile.guard';
import { ResetPasswordRequestComponent } from './reset-password-request/reset-password-request.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate:[ProfileGuard]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'resetPasswordRequest',
    component: ResetPasswordRequestComponent
  },
  {
    path:'resetPassword',
    component: ResetPasswordComponent
  },
  {
    path:'error-page',
    component: ErrorPageComponent
  },
 
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate:[ProfileGuard],
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x=>x.AdminLayoutModule)
  }]},
  {
    path: '**',
    redirectTo: 'error-page',
    canActivate:[ProfileGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
