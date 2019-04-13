import {Movie} from '../entity/movie';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {MovieNetService} from '../service/movie-net.service';

@Injectable()
export class MovieResolve implements Resolve<Movie> {

  constructor(private movieNetService: MovieNetService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie> | Promise<Movie> | Movie {
    return this.movieNetService.get(route.params.page);
  }
}
