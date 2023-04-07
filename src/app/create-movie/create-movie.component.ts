import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MovieModel} from "../dto/movie-model";
import {MovieService} from "../service/movie.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
  movieForm: FormGroup;

  constructor(private fb: FormBuilder,
              private movieService: MovieService) { }

  ngOnInit() {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      hours: [0, Validators.required],
      minutes: [0, Validators.required],
      seconds: [0, Validators.required]
    });
  }

  onSubmit() {
    const hoursValue: number = this.movieForm.value.hours;
    const minutesValue: number = this.movieForm.value.minutes;
    const secondsValue: number = this.movieForm.value.seconds;

    const hoursStr: string = hoursValue < 10 ? `0${hoursValue}` : `${hoursValue}`;
    const minutesStr: string = minutesValue < 10 ? `0${minutesValue}` : `${minutesValue}`;
    const secondsStr: string = secondsValue < 10 ? `0${secondsValue}` : `${secondsValue}`;

    const duration: string = `${hoursStr}:${minutesStr}:${secondsStr}`;


    const movie: MovieModel  = {
      title: this.movieForm.value.title,
      duration: duration
    };



    this.movieService.saveMovie(movie).subscribe(
      error => console.log(error)
    );

    // do something with the movie object, like sending it to a backend API
    console.log(movie);
  }
}
