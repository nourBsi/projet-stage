import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Admin } from '../models/Admin.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  admin:Admin;
  returnedAdmin:Admin;
  display:string="display : none ;";
  message:string;
  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  loginAttempt(val){
//console.log(this.admin);
//admin=val['mail'];
//this.admin.password=val['password'];
this.loginService.checkAdmin(val).subscribe(
  (data:Admin)=>{
    this.returnedAdmin=data;
    window.sessionStorage.setItem('user',JSON.stringify(this.returnedAdmin));
    console.log(this.returnedAdmin);
    this.router.navigate(['acceuil']);
  },
  (error) => {
 this.display="";
 if(val.login=="" && val.password=="" ){
  this.message="Les champs sont vides";
 }else if(val.login=="" && val.password!=""){

  this.message="champs email obligatoir";
}else if(val.login!="" && val.password==""){
  this.message="champs mot de passe obligatoir";
}
 else{
  this.message="Vérifier les données entrées";
 }
    console.error('An error occurred:');
    // Handle error if needed
  }
 
)
  }

  navigateToResetReq(){
    console.log("clicked!");
    this.router.navigate(['resetPasswordRequest']);
  }
}
