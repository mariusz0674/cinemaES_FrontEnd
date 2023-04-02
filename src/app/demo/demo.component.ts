import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit{

  fromDemo: String;
  constructor(private httpClient: HttpClient) {
    this.fromDemo = '';
  }

  ngOnInit(): void {
    this.httpClient.get<String>('http://localhost:8081/api/v1/usersmenager').subscribe( (data) => {
      this.fromDemo=data.toString();
      console.log(data)
     // console.log("error.toString()")

    }, (error) => {
      console.log(error)
    })

  }


}
