import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-episode-empty',
  templateUrl: './episode-empty.component.html',
  styleUrls: ['./episode-empty.component.css'],
})
export class EpisodeEmptyComponent implements OnInit {
  @HostBinding('class.routed-component')
  routed_component: boolean = true;

  constructor() {}

  ngOnInit() {}
}
