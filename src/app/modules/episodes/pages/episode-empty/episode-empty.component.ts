import { Component, HostBinding, OnInit } from '@angular/core';
import { EpisodeListComponent } from '../episode-list';

@Component({
  selector: 'app-episode-empty',
  templateUrl: './episode-empty.component.html',
})
export class EpisodeEmptyComponent implements OnInit {
  @HostBinding('class.routed-component')
  routed_component: boolean = true;

  constructor(public episodeListComponent: EpisodeListComponent,) {}

  ngOnInit() {}
}
