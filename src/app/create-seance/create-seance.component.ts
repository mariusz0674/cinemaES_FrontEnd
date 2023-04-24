import { Component } from '@angular/core';
import {SeancesService} from "../service/seances.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HallModel} from "../dto/hall-model";
import {MovieService} from "../service/movie.service";
import {MovieModel} from "../dto/movie-model";
import {SimpleSeanceModel} from "../dto/simple-seance-model";

@Component({
  selector: 'app-create-seance',
  templateUrl: './create-seance.component.html',
  styleUrls: ['./create-seance.component.css']
})
export class CreateSeanceComponent {
  seanceForm: FormGroup;
  errorMessage: string;

  audioLanguage: string;
  subtitle: boolean;
  id: number;

  date: string;
  hall_id: string;
  //seance: any = {};
  audioLanguages: string[] = ['ENGLISH', 'POLISH', 'FRENCH'];
  //movies: string[] = ['Movie 1', 'Movie 2', 'Movie 3'];
  halls: HallModel[];
  movies: MovieModel[];
  movie_title: string;

  seance: SimpleSeanceModel = {
    audioLanguage: '',
    subtitle: false,
    id: 0,
    date: '',
    hall_id: '',
    movie_title: ''
  };

  constructor(private seanceService: SeancesService,
              private movieService: MovieService) { }

  ngOnInit(): void {

    this.seanceForm = new FormGroup({
      audioLanguage: new FormControl('', Validators.required),
      subtitle: new FormControl(false),
      id: new FormControl(null, Validators.required),
      date: new FormControl('', Validators.required),
      hall_id: new FormControl('', Validators.required),
      movie_title: new FormControl('', Validators.required)
    });
    this.getHalls();
    this.getMovies();

  }

  createSeance(): void {
    this.seanceService.createSeance(this.seance)
      .subscribe(error => console.log('Error creating seance: ', error)
      );
  }

  getMovies() {
    this.movieService.getAll().subscribe(data => {
      this.movies = data;
    });
  }

  getHalls() {
    this.seanceService.getHalls().subscribe(data => {

      this.halls = data;
    }, error => {
      console.log(error);
      this.errorMessage = 'An error occurred while creating the seance.';
    });
  }
}
