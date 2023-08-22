import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cycle } from '../../models/Cycle.model';
import { Participant } from '../../models/Participant.model';
import { ActionsService } from '../../services/actions.service';
import { CycleServiceService } from '../../services/cycle-service.service';
import { ParticipantServiceService } from '../../services/participant-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-affect-participant',
  templateUrl: './affect-participant.component.html',
  styleUrls: ['./affect-participant.component.css']
})
export class AffectParticipantComponent implements OnInit {
  participants:Participant[];
  cycles:Cycle[];
  participant:Participant=null;
  cycle:Cycle=null;
  constructor(private participantService:ParticipantServiceService,private cycleService:CycleServiceService,private serviceAction: ActionsService,private router:Router) { }

  ngOnInit(): void {
    this.cycleService.getCycles().subscribe(
      (data:Cycle[])=>
      {
        
      this.cycles=data;
     
      },
      (error) => {
          console.error('An error occurred:', error);
        }
  
  );

  
  this.participantService.getParticipants().subscribe(
    (data:Participant[])=>
    {
      
    this.participants=data;
   
    },
    (error) => {
        console.error('An error occurred:', error);
      }

);
  }


  pickedCycle(val){
    console.log(val);
    this.cycleService.getCycle(val.cycle).subscribe(
      (data:Cycle)=>{
        this.cycle=data;
      },
      (error)=>{
        console.error('An error occured',error);
      }
    )
    };

  pickedParticipant(val){
    console.log( document.getElementById("infoParticipant"));
    this.participantService.getParticipant(val.participant).subscribe(
      (data:Participant)=>
      {
        
      this.participant=data;
    
   
     
      },
      (error) => {
          console.error('An error occurred:', error);
        }
  
  );
  
    document.getElementById("infoParticipant").style.display='flex';
    console.log(val);
    }
    affectParticipant(val){
      this.serviceAction.addParticipantToCycle(val.participant,val.cycle).subscribe(
        ()=>{
          Swal.fire(  
            {
              icon: 'success',
              text :'Fomateur ajouté!'
            }
          
     
          ) 
          this.router.navigate(['participant']); 
        }
      );
    }
}
