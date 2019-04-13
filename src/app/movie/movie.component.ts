import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../entity/movie';
import {EventService} from '../service/event.service';
import {Subject} from '../entity/subject';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  subjects: Array<Subject>;

  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService, private zone: NgZone) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.eventService.changeCardInfoEvent(params.page);
    });
    this.activatedRoute.data.subscribe((data: { movie: Movie }) => {
      this.subjects = data.movie.subjects;
      this.eventService.hiddenProgressEvent(true);
    });
    this.eventService.nextPageEvent$.subscribe((movie: Movie) => {
      this.zone.run(() => {
        this.subjects = this.subjects.concat(movie.subjects);
        this.eventService.hiddenProgressEvent(true);
      });
    });
  }
}
