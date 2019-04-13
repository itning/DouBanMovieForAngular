import {Component, Input, OnInit} from '@angular/core';
import {Subject} from '../entity/subject';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  @Input()
  subject: Subject;

  constructor() {
  }

  ngOnInit() {
  }

}
