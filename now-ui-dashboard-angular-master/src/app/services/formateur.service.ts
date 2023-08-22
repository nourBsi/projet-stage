import { Injectable } from '@angular/core';
import { Formateur } from '../models/Formateur.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {
listFormateurs : Formateur[];

link="http://127.0.0.1:8000/api";
    getFormateurs(): Observable<any>{
    
      return this.http.get(this.link+"/formateurs");
    // console.log(forms);
    
      }
      addFormateur(formateur:Formateur){
        return this.http.post(`${this.link}/addformateur`,formateur);
      }

     deleteFormateur(id:number){
      return this.http.delete(`${this.link}/deleteformateur/${id}`)
      }

    updateFormateur(formateur:Formateur){
      console.log(JSON.stringify(formateur));
      return this.http.put<Formateur>(this.link+"/updateformateur",formateur);
      
      }

    getFormateur(id:number){
      return this.http.get(`${this.link}/formateur/${id}`)
     }

  constructor(private http: HttpClient) { 

  }
}
