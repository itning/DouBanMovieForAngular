import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CdkScrollable, ScrollDispatcher} from '@angular/cdk/overlay';
import {MovieNetService} from './service/movie-net.service';
import {EventService} from './service/event.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hiddenProgress = false;
  opened = false;
  typeMovie: string;
  cdk: CdkScrollable;

  constructor(private router: Router,
              private eventService: EventService,
              private scrollDispatcher: ScrollDispatcher,
              private movieNetService: MovieNetService,
              private zone: NgZone) {
    eventService.changeCardInfoEvent$.subscribe(next => {
      this.typeMovie = AppComponent.getDesp(next);
    });
    eventService.hiddenProgressEvent$.subscribe(next => {
      this.hiddenProgress = next;
    });
    scrollDispatcher.scrolled().subscribe((x: CdkScrollable) => {
      if (this.hiddenProgress === false) {
        return;
      }
      if (x.measureScrollOffset('bottom') < 300) {
        zone.run(() => {
          this.hiddenProgress = false;
        });
        this.cdk = x;
        this.movieNetService.nextPage();
      }
    });
  }

  static getDesp(type: string): string {
    switch (type) {
      case 'in_theaters': {
        return '正在热映';
      }
      case 'coming_soon': {
        return '即将上映';
      }
      case 'top250': {
        return 'TOP250';
      }
      default: {
        return '正在热映';
      }
    }
  }

  routerTo(inTheaters: string) {
    this.movieNetService.clear(inTheaters);
    this.cdk.scrollTo({top: 0});
    this.router.navigate(['/movie', inTheaters]);
    this.opened = !this.opened;
    this.typeMovie = AppComponent.getDesp(inTheaters);
  }

  refresh() {
    window.location.reload();
  }

  ngOnInit(): void {
  }
}
