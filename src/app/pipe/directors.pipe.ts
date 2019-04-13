import {Pipe, PipeTransform} from '@angular/core';
import {Cast, Director} from '../entity/subject';

@Pipe({
  name: 'filterName'
})
export class DirectorsPipe implements PipeTransform {

  transform(directors: Array<Director> | Array<Cast>): string {
    return directors.map(d => d.name).join('，');
  }
}
