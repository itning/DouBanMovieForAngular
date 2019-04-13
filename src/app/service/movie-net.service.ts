import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Api} from '../api/api';
import {Movie} from '../entity/movie';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Subject} from '../entity/subject';
import {EventService} from './event.service';

@Injectable({
  providedIn: 'root'
})
export class MovieNetService {
  parser = document.createElement('a');
  page = 1;
  count = 15;
  total: number;
  typeTemp: string;

  constructor(private http: HttpClient, private eventService: EventService, private zone: NgZone) {
  }

  clear(type: string) {
    this.page = 1;
    this.count = 15;
    this.total = 0;
    this.typeTemp = type;
  }

  nextPage() {
    if ((this.page * this.count) >= this.total) {
      this.zone.run(() => {
        this.eventService.hiddenProgressEvent(true);
      });
      return;
    }
    this.page++;
    const start = this.page === 1 ? 0 : (this.page - 1) * this.count + 1;
    this.get(this.typeTemp, start, this.count).subscribe(movie => {
      this.eventService.nextPageEvent(movie);
    });
  }

  get(type: string, start = 0, count = 15): Observable<Movie> {
    let url: string;
    switch (type) {
      case 'in_theaters': {
        url = Api.inTheaters;
        break;
      }
      case 'coming_soon': {
        url = Api.comingSoon;
        break;
      }
      case 'top250': {
        url = Api.top250;
        break;
      }
      default : {
        url = Api.inTheaters;
      }
    }
    this.typeTemp = type;
    this.eventService.hiddenProgressEvent(false);
    return this.http.jsonp<Movie>(url + `?start=${start}&count=${count}`, 'callback')
      .pipe(map(movie => {
        movie.subjects.map((subject: Subject) => {
          this.parser.href = subject.images.medium;
          subject.images.medium = 'http://img3.doubanio.com' + this.parser.pathname;
          return subject;
        });
        this.total = movie.total;
        return movie;
      }));
  }
}
