import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cycle } from '../../models/Cycle.model';
import { Participant } from '../../models/Participant.model';
import { ParticipantServiceService } from '../../services/participant-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-details-participant',
  templateUrl: './details-participant.component.html',
  styleUrls: ['./details-participant.component.css']
})
export class DetailsParticipantComponent implements OnInit {
  participant:Participant;
  cycles:Cycle[];
  cols!: Column[];
  notAvailable:boolean;

  id:number;
  nb:number;
  constructor(private participantService:ParticipantServiceService,private activatedRoute:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'numact', header: '#Num' },
      { field: 'theme', header: 'Thème' },
      { field: 'datedeb', header: 'Date debut' },
      { field: 'datefin', header: 'Date fin' },
      { field: 'numsalle', header: 'Numéro Salle' }
  ];
  this.id = this.activatedRoute.snapshot.params['id'];

  this.participantService.getParticipant(this.id).subscribe(
    (data:Participant)=>
    {
      
    this.participant=data;
    this.cycles=data['mescycles'];
    this.nb=data['mescycles'].length;
    if(data['mescycles'].length==0){
      this.notAvailable=true;

    }
    else{

    }
   
    },
    (error) => {
        console.error('An error occurred:', error);
      }

);



  }
  deleteParticipant(id:number){
    Swal.fire({  
      title: 'Voulez-vous vraiment supprimer ce participant ?',  
      text: 'Vous ne pourrez pas récupérer ce participant!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Oui, supprimer ',  
      cancelButtonText: 'Non, Gardez-le'  
    }).then((result) => {  
      if (result.value) {  
        this.participantService.deleteParticipant(id).subscribe();
        
        Swal.fire(  
          {
            icon: 'success',
            text :'Fomateur supprimé!'
          }
        
   
        ) 
        this.router.navigate(['participant']); 
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire( {
         
          text :'Suppression annulée'
        }

        )  
      }  
    })  
  }

}
