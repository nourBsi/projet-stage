import { Component, Input, OnInit } from '@angular/core';
import { Formateur } from '../../models/Formateur.model';
import { FormateurService } from '../../services/formateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-formateur',
  templateUrl: './add-formateur.component.html',
  styleUrls: ['./add-formateur.component.css']
})
export class AddFormateurComponent implements OnInit {
 formateur:Formateur;

  constructor(private formateurService:FormateurService,private router:Router){}
  ngOnInit(): void {
  
  }
  saveFormateur(val){
 // this.formateur=val;
    this.formateurService.addFormateur(val).subscribe();
    this.router.navigate(['acceuil']);
  }

}
