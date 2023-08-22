import { Component, OnInit, ViewChild } from '@angular/core';
import { Cycle } from '../models/Cycle.model';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { CycleServiceService } from '../services/cycle-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.css']
})
export class CycleComponent implements OnInit {

  cycles:Cycle[];
  datesdeb:string[]=[];
  datesfin:string[]=[];
 

  @ViewChild('dt') table: Table;
  clonedCycles: { [s: string]: Cycle } = {};
  clonedDatesdeb:{[s: string]:string}={};
  clonedDatesfin:{[s: string]:string}={};

  constructor(private primengConfig: PrimeNGConfig,private cycleService:CycleServiceService,private router: Router) { }

  ngOnInit(): void {

    this.cycleService.getCycles().subscribe(
      (data:Cycle[])=>
      {
        
      this.cycles=data;
      this.datesdeb=data['datedeb'];
      this.datesfin=data['datefin'];
      this.datesdeb = data.map(cycle => this.formatDate(cycle.datedeb));
      this.datesfin = data.map(cycle => this.formatDate(cycle.datefin));

        console.log(this.datesdeb);

        console.log(this.datesfin);

      },
      (error) => {
          console.error('An error occurred:', error);
        }
  
  );
  this.primengConfig.ripple = true;

  }
  onRowEditInit(cycle: Cycle, index: number) {
    this.clonedCycles[index] = { ...this.cycles[index] };
    this.clonedDatesdeb[index]=this.datesdeb[index];
    this.clonedDatesfin[index]=this.datesfin[index];
}

formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

onRowEditSave(cycle: Cycle, index: number,datesdeb:string,datesfin:string) {

 console.log(datesdeb);
 console.log(datesfin)
   this.cycleService.updateCycle(cycle,datesdeb,datesfin).subscribe(
    (response) => {
      console.log('Cycle updated successfully:', response);
      // Handle success if needed
    },
    (error) => {
      console.error('An error occurred:', error);
      // Handle error if needed
    })
  console.log(cycle);
}
onRowEditCancel(cycle: Cycle, index: number,datesdeb:string,datesfin:string) {
    this.cycles[index] = this.clonedCycles[index];
    this.datesdeb[index] = this.clonedDatesdeb[index];
    this.datesfin[index] = this.clonedDatesfin[index];
  
    // Delete the cloned cycle entry
    delete this.clonedCycles[index];
}



navigateToDetails(id:number){
  console.log(id);
  this.router.navigate(['detailsCycle', id]);
  
  }
  updateDatedeb(id:number,formattedDate: string){
    const parsedDate = new Date(formattedDate);
    this.cycles[id].datedeb = parsedDate;
  }
  updateDatefin(id:number,formattedDate: string){
    const parsedDate = new Date(formattedDate);
    this.cycles[id].datedeb = parsedDate;
  }

  
   parseDate(dateStr: string): Date {
    const parts = dateStr.split('/');
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
  }
}
