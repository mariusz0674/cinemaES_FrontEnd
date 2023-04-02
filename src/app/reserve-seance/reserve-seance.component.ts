import {Component, OnInit} from '@angular/core';
import {SimpleSeanceModel} from "../dto/simple-seance-model";
import {ActivatedRoute, Router} from "@angular/router";
import {CinemaHallEventModel} from "../dto/cinema-hall-event-model";
import {HttpClient} from "@angular/common/http";
import {SeatModel} from "../dto/seat-model";

@Component({
  selector: 'app-reserve-seance',
  templateUrl: './reserve-seance.component.html',
  styleUrls: ['./reserve-seance.component.css']
})


export class ReserveSeanceComponent implements OnInit {

  seance: SimpleSeanceModel;
  hallEvent: CinemaHallEventModel;
  rows: number[] = [];
  columns: number[] = [];
  seatMap = [];
  maxRow: number = 0;
  maxCol: number = 0;
  seats: Array<SeatModel>;
  seatsArray: SeatModel[][];
  selectedSeat: SeatModel = null;
  selectedSeats: SeatModel[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) { }


  fetchdata(): void{
    if (this.seats) {
      this.seats.forEach(seat => {
        if (seat.row > this.maxRow) {
          this.maxRow = seat.row
        }
        if (seat.column > this.maxCol) {
          this.maxCol = seat.column
        }
      });
      console.log(this.maxCol)
      console.log(this.maxRow)

      this.seatsArray = new Array<SeatModel[]>(this.maxRow);
      for(let i = 0; i < this.maxRow+1; i++) {
        this.seatsArray[i] = new Array<SeatModel>(this.maxCol).fill(null);
      }


      for (let i = 0; i < this.maxRow; i++) {
        this.seatsArray[i] = [];
        for (let j = 0; j < this.maxCol; j++) {
          this.seatsArray[i][j] = null;
        }}

      this.seats.forEach(seat => {
        this.seatsArray[seat.row][seat.column] = seat;
      });




    }
    this.rows = Array.from(Array(this.maxRow).keys());
    this.columns = Array.from(Array(this.maxCol).keys());


  }
  ngOnInit(): void {
    this.seance = history.state;    //this.seance = this.route.snapshot?.data?.['seance'];
    console.log(this.seance);
    if (this.seance) {
      this.http.get<CinemaHallEventModel>(`http://localhost:8081/api/v1/seance/getHallEvent?seanceId=${this.seance.id}`)
        .subscribe(data => {
            this.hallEvent = data;
            this.seats = data.seats;
            console.log(this.seats );
            this.fetchdata();
          }, error => {
            console.log(error);
          }
        );
    }




  }



  isSeatTaken(row: number, column: number): boolean {
    const seat = this.getSeatByRowAndColumn(row, column);
    return seat ? seat.isTaken : false;
  }

  getSeatByRowAndColumn(row: number, column: number): SeatModel{
    return this.seats.find(seat => seat.row === row && seat.column === column);
  }

  getSeatClasses(row: number, column: number): string[] {
    const classes = ['seat'];

    if(this.seatsArray[row][column] === null){
      classes.push('seat-hidden');
    }else if(this.seatsArray[row][column].isTaken ) {
      classes.push('seat-taken');
    }else{
      classes.push('seat-free');
    }

    if(this.selectedSeats && this.selectedSeats.includes(this.seatsArray[row][column] )){
      classes.push('seat-selected');
    }
    if(this.seatsArray[row][column] === this.selectedSeat && this.selectedSeat != null){
      classes.push('seat-selected');
    }
    return classes;
  }


  onSeatClicked(row: number, column: number) {
    if(this.seatsArray[row][column].isTaken){
      return;
    }else if(this.selectedSeats.includes(this.seatsArray[row][column])){
      this.selectedSeats.splice(this.selectedSeats.indexOf(this.seatsArray[row][column]),1);
    }else{
      this.selectedSeats.push(this.seatsArray[row][column]);

    }


  }

  onReserveClicked() {

    const seatsoUpdate: Array<SeatModel> = new Array<SeatModel>();

    this.selectedSeats.forEach(seat => {
      console.log(this.seatsArray[seat.row][seat.column]);
      seat.isTaken=true;
      this.seatsArray[seat.row][seat.column]=seat;

      console.log(this.seatsArray[seat.row][seat.column]);

    });

    this.seatsArray.forEach(seatArr => {
      seatArr.forEach( seat => {
        if(seat!=null && seat.isTaken!=null){
          seatsoUpdate.push(seat);
        }
      });
    });

  this.hallEvent.seats=seatsoUpdate;

    this.http.post<boolean>(`http://localhost:8081/api/v1/seance/updateSeats`, this.hallEvent)
      .subscribe( error => {
          console.log(error);
        }
      );

  }
}
