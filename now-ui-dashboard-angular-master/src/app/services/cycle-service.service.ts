import { Injectable } from '@angular/core';
import { Cycle } from '../models/Cycle.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CycleServiceService {

  listCycles : Cycle[];

  link="http://127.0.0.1:8000/api";

  getCycles(): Observable<any>{
      
    return this.http.get(this.link+"/cycles");
  // console.log(forms);
  
    }
    addCycle(cycle:Cycle){
      return this.http.post(`${this.link}/addcycle`,cycle);
    }

   deleteCycle(id:number){
    return this.http.delete(`${this.link}/deletecycle/${id}`)
    }

  updateCycle(cycle:Cycle,datedeb:string,datefin:string){
    let j={
      "id":cycle.id,
    "numact": cycle.numact,
    "theme":cycle.theme,
    "datedeb": datedeb,
    "datefin":datefin,
    "numsalle": cycle.numsalle
  }
  console.log(j);
    let data= JSON.stringify(j)
  //  console.log(JSON.stringify(cycle));
    return this.http.put<Cycle>(this.link+"/updatecycle",data);
    
    }

  getCycle(id:number){
    return this.http.get(`${this.link}/cycle/${id}`)
   }

  constructor(private http: HttpClient) { }
}
