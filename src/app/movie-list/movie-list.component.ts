import {Component, OnInit} from '@angular/core';
import {MovieModel} from "../dto/movie-model";
import {SimpleSeanceModel} from "../dto/simple-seance-model";
import {MovieService} from "../service/movie.service";
import {SeancesService} from "../service/seances.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{

  selectedMovie: MovieModel | null = null;
  seances: SimpleSeanceModel[];
  movies: MovieModel[];
  selectedSeances: SimpleSeanceModel[];

  constructor(private movieService: MovieService,
              private seancesService: SeancesService,
              private router: Router) {}

  onSelectMovie(movie: MovieModel): void {
    this.selectedMovie = movie;
    this.selectedSeances = this.seances.filter(seance => seance.movie_title === movie.title);
  }

  ngOnInit(): void {
      this.movieService.getAll().subscribe(
        data => this.movies=data,
        error => console.log(error)
      );
    this.seancesService.getAll().subscribe(
      data => this.seances=data,
      error => console.log(error)
    );

  }
  isSelected(movie: MovieModel): boolean {
    return this.selectedMovie === movie;
  }
  reserveSeance(seance: SimpleSeanceModel) {
    const seanceToReserv = seance;
    console.log(seanceToReserv.movie_title);

    this.router.navigate(['/reserve-seance'],{ state: seanceToReserv });

    //this.router.navigate(['/reserve-seance'], { state: { seance: seance } });
  }

}
