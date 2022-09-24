import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-episode-empty',
  host: { class: 'routed-component' },
  templateUrl: './episode-empty.component.html',
  styleUrls: ['./episode-empty.component.css'],
})
export class EpisodeEmptyComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
