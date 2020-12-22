import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera.response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

@HostListener('window:scroll', ['$event'])
onScroll(){
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    if(pos > max) {
      //llamar el servicio
      if(this.peliculasServicio.cargando) {return;}

      this.peliculasServicio.getcartelera().subscribe(movies => {
                this.movies.push(...movies);
      });
    }
}
  constructor(private peliculasServicio: PeliculasService) { }

  ngOnInit(): void {
    
    this.peliculasServicio.getcartelera()
                         .subscribe( movies => {
                           // console.log(resp);
                            this.movies = movies;
                            this.moviesSlideshow = movies;
                         })
  }

  ngOnDestroy(){
    this.peliculasServicio.resetCarteleraPage();
  }

}
