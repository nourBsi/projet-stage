import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { data } from 'jquery';
import { Admin } from '../models/Admin.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.css']
})
export class ResetPasswordRequestComponent implements OnInit {
returnedAdmin:Admin;
  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  resetRequest(val){
    this.loginService.resetReq(val['email']).subscribe(
      (data:Admin)=>{
        this.returnedAdmin=data;
        console.log(this.returnedAdmin);
       /* const emailData = {
          to: this.returnedAdmin.login,
          from: 'nour.bsila@gmail.com',
          subject: 'Test Email from Angular',
          text: 'This is a test email sent from an Angular app using SendGrid.',
        };*/
       // document.getElementById("but").disabled=true;
       Swal.fire(  
        {
          icon: 'success',
          text :'Un lien de modification de mot de passe est envoyé à votre e-mail!'
        });
        this.router.navigate(['login']);
      },
      (error) => {
        console.error('An error occurred:');
        // Handle error if needed
      }
    );
    
  }
}
