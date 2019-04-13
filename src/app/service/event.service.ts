import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Movie} from '../entity/movie';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  changeCardInfoEventSource = new Subject<string>();
  hiddenProgressEventSource = new Subject<boolean>();
  nextPageEventSource = new Subject<Movie>();

  changeCardInfoEvent$ = this.changeCardInfoEventSource.asObservable();
  hiddenProgressEvent$ = this.hiddenProgressEventSource.asObservable();
  nextPageEvent$ = this.nextPageEventSource.asObservable();

  changeCardInfoEvent(event: string) {
    this.changeCardInfoEventSource.next(event);
  }

  hiddenProgressEvent(event: boolean) {
    this.hiddenProgressEventSource.next(event);
  }

  nextPageEvent(event: Movie) {
    this.nextPageEventSource.next(event);
  }


  constructor() {
  }
}
