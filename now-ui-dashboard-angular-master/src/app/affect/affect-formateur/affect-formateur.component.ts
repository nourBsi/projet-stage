import { Component, OnInit } from '@angular/core';
import { Formateur } from '../../models/Formateur.model';
import { Cycle } from '../../models/Cycle.model';
import { FormateurService } from '../../services/formateur.service';
import { CycleServiceService } from '../../services/cycle-service.service';
import { ActionsService } from '../../services/actions.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-affect-formateur',
  templateUrl: './affect-formateur.component.html',
  styleUrls: ['./affect-formateur.component.css']
})
export class AffectFormateurComponent implements OnInit {
formateurs:Formateur[];
cycles:Cycle[];
formateur:Formateur=null;
formCycle:Formateur[];
cycle:Cycle;

  constructor(private formateurService:FormateurService,private cycleService:CycleServiceService,private serviceAction: ActionsService,private router:Router) { }

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

  
  this.formateurService.getFormateurs().subscribe(
    (data:Formateur[])=>
    {
      
    this.formateurs=data;
    
   
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
        this.formCycle=data['formateurs'];

      },
      (error)=>{
        console.error('An error occured',error);
      }
    )}
pickedFormateur(val){
  console.log( document.getElementById("infoFormateur"));
  this.formateurService.getFormateur(val.formateur).subscribe(
    (data:Formateur)=>
    {
      
    this.formateur=data;
  
 
   
    },
    (error) => {
        console.error('An error occurred:', error);
      }

);

  document.getElementById("infoFormateur").style.display='flex';
  console.log(val);
  }
  affectFormateur(val){
    console.log(this.formCycle.length);
    if(this.formCycle.length==3){
      Swal.fire(  
        {
          icon: 'error',
          text :'le nombre maximal des formateurs est 3!'
        }
      )
    }else{
      this.serviceAction.addFormateurToCycle(val.formateur,val.cycle).subscribe(
        ()=>{
          Swal.fire(  
            {
              icon: 'success',
              text :'Fomateur ajouté!'
            }
          
     
          ) 
          this.router.navigate(['formateur']); 
        }
      );
    }
 
  }
}
