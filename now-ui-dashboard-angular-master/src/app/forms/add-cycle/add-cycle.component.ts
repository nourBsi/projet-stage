import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cycle } from '../../models/Cycle.model';
import { CycleServiceService } from '../../services/cycle-service.service';

@Component({
  selector: 'app-add-cycle',
  templateUrl: './add-cycle.component.html',
  styleUrls: ['./add-cycle.component.css']
})
export class AddCycleComponent implements OnInit {
cycle:Cycle;
  constructor(private cycleService:CycleServiceService,private router:Router) { }

  ngOnInit(): void {
  }

  saveCycle(val){
    // this.cycle=val;
       this.cycleService.addCycle(val).subscribe();
       this.router.navigate(['acceuil']);
     }

}
