import {Component, OnInit} from '@angular/core';
import {SeancesService} from "../service/seances.service";
import {SimpleSeanceModel} from "../dto/simple-seance-model";

@Component({
  selector: 'app-seances-simple-list',
  templateUrl: './seances-simple-list.component.html',
  styleUrls: ['./seances-simple-list.component.css']
})
export class SeancesSimpleListComponent implements OnInit{

  seancesList: Array<SimpleSeanceModel>;
  constructor(private seancesService: SeancesService){

  }
  ngOnInit(): void {
    this.seancesService.getAll().subscribe(
      seancesList => this.seancesList = seancesList,
      error => console.log(error)
    );
  }

}
