import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MovieComponent} from '../movie/movie.component';
import {MovieResolve} from './movie.resolve';

const routes: Routes = [
  {path: 'movie/:page', component: MovieComponent, resolve: {movie: MovieResolve}},
  {path: '**', redirectTo: 'movie/in_theaters'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [MovieResolve]
})
export class AppRoutingModule {
}
