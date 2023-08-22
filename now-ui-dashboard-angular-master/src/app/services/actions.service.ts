import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cycle } from '../models/Cycle.model';
import { Formateur } from '../models/Formateur.model';
import { Participant } from '../models/Participant.model';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  link="http://127.0.0.1:8000/api";

addFormateurToCycle(idFormateur:number,idCycle:number ){
  let j={
    "id":idCycle,
    "formateur":idFormateur
  }
 let data= JSON.stringify(j)

 return this.http.put<Cycle>(this.link+"/addFormateurToCycle",data);
}

addParticipantToCycle(idParticipant:number,idCycle:number){
  let j={
    "id":idCycle,
    "participant":idParticipant
  }
 let data= JSON.stringify(j)

 return this.http.put<Cycle>(this.link+"/addParticipantToCycle",data);

}
delParticipantFromCycle(idParticipant:number,idCycle:number){
  let j={
    "id":idCycle,
    "participant":idParticipant
  }
 let data= JSON.stringify(j)

  return this.http.put(`${this.link}/removeParticipantfromCycle`,data)

}
delFormateurFromCycle(idFormateur:number,idCycle:number){
  let j={
    "id":idCycle,
    "formateur":idFormateur
  }
 let data= JSON.stringify(j)

  return this.http.put(`${this.link}/removeFormateurfromCycle`,data)

}
  constructor(private http: HttpClient) { }
}
