import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cycle } from '../../models/Cycle.model';
import { Formateur } from '../../models/Formateur.model';
import { Participant } from '../../models/Participant.model';
import { CycleServiceService } from '../../services/cycle-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ActionsService } from '../../services/actions.service';


interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-details-cycle',
  templateUrl: './details-cycle.component.html',
  styleUrls: ['./details-cycle.component.css']
})
export class DetailsCycleComponent implements OnInit {
formateurs:Formateur[];
participants:Participant[];
cycle:Cycle;
colsP!: Column[];
colsF!: Column[];
FnotAvailable:boolean;
PnotAvailable:boolean;
id:number;
  constructor(private cycleService:CycleServiceService,private activatedRoute:ActivatedRoute,private router: Router,private actionService:ActionsService) { }

  ngOnInit(): void {
    this.colsP = [
      { field: 'nomprenom', header: 'Nom et prénom' },
      { field: 'mail', header: 'E-mail' },

      
      
     
  ];

  this.colsF = [
    { field: 'nomprenom', header: 'Nom et prénom' },
    { field: 'specialite', header: 'Spécialité' },

   
];
this.id = this.activatedRoute.snapshot.params['id'];

this.cycleService.getCycle(this.id).subscribe(
    (data:Cycle)=>
    {
      
    this.cycle=data;
    this.participants=data['lesparticipants'];
    this.formateurs=data['formateurs'];
    console.log("done");
   console.log(this.participants);
   console.log("done");

   console.log(this.formateurs);
    if(data['lesparticipants'].length==0){
      this.PnotAvailable=true;

    }
   if(data['formateurs'].length==0){
    this.FnotAvailable=true;

   }
   
    },
    (error) => {
        console.error('An error occurred:', error);
      }

);

  }

  deleteCycle(id:number){
    Swal.fire({  
      title: 'Voulez-vous vraiment supprimer ce cycle ?',  
      text: 'Vous ne pourrez pas récupérer ce cycle!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Oui, supprimer ',  
      cancelButtonText: 'Non, Gardez-le'  
    }).then((result) => {  
      if (result.value) {  
        this.cycleService.deleteCycle(id).subscribe(
          ()=>{
            Swal.fire(  
              {
                icon: 'success',
                text :'Cycle supprimé!'
              }
            
       
            ) ;
            this.router.navigate(['cycle']); 
          }
        );
        
       

       

      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire( {
         
          text :'Suppression annulée'
        }

        )  
      }  
    })  
  }

  navigateToDetailsP(id:number){
    console.log(id);
    this.router.navigate(['detailsParticipant', id]);
    
    }
    navigateToDetailsF(id:number){
      console.log(id);
      this.router.navigate(['detailsFormateur', id]);
      
      }
      deleteParticipantFrom(idPart:number){
        Swal.fire({  
          title: 'Voulez-vous vraiment supprimer ce participant de ce cycle ?',  
          icon: 'warning',  
          showCancelButton: true,  
          confirmButtonText: 'Oui, supprimer ',  
          cancelButtonText: 'Non, Gardez-le'  
        }).then((result) => {  
          if (result.value) {  
            this.actionService.delParticipantFromCycle(idPart,this.id).subscribe();
            
            Swal.fire(  
              {
                icon: 'success',
                text :'Participant supprimé!'
              }
            
       
            ) 
           this.router.navigate(['cycle']); 
          } else if (result.dismiss === Swal.DismissReason.cancel) {  
            Swal.fire( {
             
              text :'Suppression annulée'
            }
    
            )  
          }  
        })  
      }




      deleteFormateurFrom(idForm:number){
        Swal.fire({  
          title: 'Voulez-vous vraiment supprimer ce Formateur de ce cycle ?',  
          icon: 'warning',  
          showCancelButton: true,  
          confirmButtonText: 'Oui, supprimer ',  
          cancelButtonText: 'Non, Gardez-le'  
        }).then((result) => {  
          if (result.value) {  
            this.actionService.delFormateurFromCycle(idForm,this.id).subscribe();
            
            Swal.fire(  
              {
                icon: 'success',
                text :'Formateur supprimé!'
              }
            
       
            ) 
          this.router.navigate(['cycle']); 
          } else if (result.dismiss === Swal.DismissReason.cancel) {  
            Swal.fire( {
             
              text :'Suppression annulée'
            }
    
            )  
          }  
        })  
      }
}
