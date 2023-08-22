import { Component, OnInit } from '@angular/core';
import { Formateur } from '../../models/Formateur.model';
import { FormateurService } from '../../services/formateur.service';
import { ActivatedRoute } from '@angular/router';
import { Cycle } from '../../models/Cycle.model';
import { TableModule } from 'primeng/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-details-formateur',
  templateUrl: './details-formateur.component.html',
  styleUrls: ['./details-formateur.component.css']
})
export class DetailsFormateurComponent implements OnInit {
 formateur:Formateur;
 cycles:Cycle[];
 cols!: Column[];
 notAvailable:boolean;
 isLoading:boolean=true;
 id:number;
 nb:number;
  constructor(private formateurService:FormateurService,private activatedRoute:ActivatedRoute,private router: Router) { }

  
;
  async ngOnInit(): Promise<void>  {

    this.cols = [
      { field: 'numact', header: '#Num' },
      { field: 'theme', header: 'Thème' },
      { field: 'datedeb', header: 'Date debut' },
      { field: 'datefin', header: 'Date fin' },
      { field: 'numsalle', header: 'Numéro Salle' }
  ];


    this.id = this.activatedRoute.snapshot.params['id'];
    
    try {
      this.formateur = await this.formateurService.getFormateur(this.id).toPromise() as Formateur;
      this.cycles = this.formateur['cycles'];
      this.cycles.forEach(element => {
   console.log(        ((element.datedeb).toString()).substring(10)
   );
        
      });
      this.nb=this.cycles.length;
      if (this.cycles.length === 0) {
        this.notAvailable = true;
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      this.isLoading = false;
    }
    
   
    
   
  }
  deleteFormateur(id:number){
    Swal.fire({  
      title: 'Voulez-vous vraiment supprimer ce formateur ?',  
      text: 'Vous ne pourrez pas récupérer ce formateur!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Oui, supprimer ',  
      cancelButtonText: 'Non, Gardez-le'  
    }).then((result) => {  
      if (result.value) {  
        this.formateurService.deleteFormateur(id).subscribe();
        
        Swal.fire(  
          {
            icon: 'success',
            text :'Fomateur supprimé!'
          }
        
   
        ) 
        this.router.navigate(['formateur']); 
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire( {
         
          text :'Suppression annulée'
        }

        )  
      }  
    })  
  }
  
}
