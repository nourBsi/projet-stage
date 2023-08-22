import { Component, OnInit, ViewChild } from '@angular/core';
import { Participant } from '../models/Participant.model';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { ParticipantServiceService } from '../services/participant-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {
participants:Participant[];
@ViewChild('dt') table: Table;
  clonedParticipants: { [s: string]: Participant } = {};
  constructor(private primengConfig: PrimeNGConfig,private participantService:ParticipantServiceService,private router: Router) { }

  ngOnInit(): void {

    this.participantService.getParticipants().subscribe(
      (data:Participant[])=>
      {
        
      this.participants=data;
     
      },
      (error) => {
          console.error('An error occurred:', error);
        }
  
  );
  this.primengConfig.ripple = true;
      }
  onRowEditInit(participant: Participant, index: number) {
    this.clonedParticipants[index] = { ...this.participants[index] };
}

onRowEditSave(participant: Participant, index: number) {
    
  this.participantService.updateParticipant(participant).subscribe(
    (response) => {
      console.log('Participant updated successfully:', response);
      // Handle success if needed
    },
    (error) => {
      console.error('An error occurred:', error);
      // Handle error if needed
    })
  console.log(participant);
}


onRowEditCancel(participant: Participant, index: number) {
  this.participants[index] = this.clonedParticipants[index];
  delete this.clonedParticipants[index];
}

navigateToDetails(id:number){
  console.log(id);
  this.router.navigate(['detailsParticipant', id]);
  
  }
  

}
