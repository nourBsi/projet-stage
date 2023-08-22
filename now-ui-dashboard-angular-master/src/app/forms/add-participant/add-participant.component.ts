import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantServiceService } from '../../services/participant-service.service';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css']
})
export class AddParticipantComponent implements OnInit {

  constructor(private participantService:ParticipantServiceService,private router:Router) { }

  ngOnInit(): void {
  }
  saveParticipant(val){
    // this.participant=val;
       this.participantService.addParticipant(val).subscribe();
       this.router.navigate(['acceuil']);
     }
}
