import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/Admin.model';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
admins:Admin[];
link="http://127.0.0.1:8000/api";
checkAdmin(admin:Admin): Observable<any>{
    
  return this.http.post(this.link+"/login",admin);
// console.log(forms);

  }

  resetCheck(token:string,dateexp:string){
    let j={
      "token":token,
      "dateexp":dateexp
    }
    let data= JSON.stringify(j);
    console.log(data)
    return this.http.put(this.link+"/checkReset",data);
  }

  resetReq(mail:string):Observable<any>{
    let j={
      "email":mail,
    }
    let data= JSON.stringify(j)
return this.http.put(this.link+"/resetRequest",data);
  }


  updateAdmin(id:number,login:string,password:string)
  {
    let j={
      "id":id,
      "login":login,
      "password":password
    }
    let data= JSON.stringify(j)
    return this.http.put(this.link+"/updateadmin",data);

  }
  constructor(private http: HttpClient) { }
}
