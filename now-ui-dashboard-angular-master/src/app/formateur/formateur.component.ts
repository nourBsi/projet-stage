import { Component, OnInit , ViewChild} from '@angular/core';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Formateur } from '../models/Formateur.model';
import { FormateurService } from '../services/formateur.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css']
})
export class FormateurComponent implements OnInit {
//    formateurService:FormateurService;
 formateurs: Formateur[];

  @ViewChild('dt') table: Table;
  clonedFormateurs: { [s: string]: Formateur } = {};
  constructor(private primengConfig: PrimeNGConfig,private formateurService:FormateurService,private router: Router) { }


  ngOnInit(): void {
    this.formateurService.getFormateurs().subscribe(
        (data:Formateur[])=>
        {
          
        this.formateurs=data;
       
        },
        (error) => {
            console.error('An error occurred:', error);
          }
    
    );

    
   



  
  this.primengConfig.ripple = true;
}
onRowEditInit(formateur: Formateur, index: number) {
    this.clonedFormateurs[index] = { ...this.formateurs[index] };
}

onRowEditSave(formateur: Formateur, index: number) {
    
  this.formateurService.updateFormateur(formateur).subscribe(
    (response) => {
      console.log('Formateur updated successfully:', response);
      // Handle success if needed
    },
    (error) => {
      console.error('An error occurred:', error);
      // Handle error if needed
    })
  console.log(formateur);
}
onRowEditCancel(formateur: Formateur, index: number) {
    this.formateurs[index] = this.clonedFormateurs[index];
    delete this.clonedFormateurs[index];
}


navigateToDetails(id:number){
console.log(id);
this.router.navigate(['detailsFormateur', id]);

}
}
