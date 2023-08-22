import { Injectable } from '@angular/core';
import { Participant } from '../models/Participant.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticipantServiceService {
  listParticipants : Participant[];

  link="http://127.0.0.1:8000/api";
      getParticipants(): Observable<any>{
      
        return this.http.get(this.link+"/participants");
      // console.log(forms);
      
        }
        addParticipant(participant:Participant){
          return this.http.post(`${this.link}/addparticipant`,participant);
        }
  
       deleteParticipant(id:number){
        return this.http.delete(`${this.link}/deleteparticipant/${id}`)
        }
  
      updateParticipant(participant:Participant){
        console.log(JSON.stringify(participant));
        return this.http.put<Participant>(this.link+"/updateparticipant",participant);
        
        }
  
      getParticipant(id:number){
        return this.http.get(`${this.link}/participant/${id}`)
       }
  
  constructor(private http: HttpClient) { }
}
