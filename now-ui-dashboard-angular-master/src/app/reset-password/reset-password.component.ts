import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
token:string;
dateexp:string;
state:boolean;
email:string;
id:number;
  constructor(private route: ActivatedRoute,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
   /* this.route.data.subscribe(data=>{
      this.token=data["token"];
      this.dateexp=data["dateexp"];
    })*/
   this.token = this.route.snapshot.params['token'];
    this.dateexp = this.route.snapshot.params['dateexp'];
console.log(this.token);
console.log(this.dateexp);
    this.loginService.resetCheck(this.token,this.dateexp).subscribe(
      (data)=>{
        this.state=data['state'];
        this.email=data['email'];
        this.id=data['id'];
       if(this.state==false){
        this.router.navigate(['error-page']);
       }
      }
    );


}

updatePassword(val){
  console.log(val['password2']);
  console.log(val['password1']);

  if(val['password1']==val['password2']){
    this.loginService.updateAdmin(this.id,this.email,val['password1']).subscribe(
      ()=>{
        Swal.fire(  
          {
            icon: 'success',
            text :'Mot de passe changé!'
          });
        this.router.navigate(['login']);
      },
      (error) => {
          console.error('An error occurred:', error);
        }
    )
  }
}
}