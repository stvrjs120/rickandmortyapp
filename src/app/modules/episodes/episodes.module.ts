import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { routes } from './episodes.routing';
import {
  EpisodeDetailsComponent,
  EpisodeEmptyComponent,
  EpisodeHeaderComponent,
  EpisodeListComponent
} from './pages';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatIconModule,
  ],
  declarations: [
    EpisodeDetailsComponent,
    EpisodeEmptyComponent,
    EpisodeListComponent,
    EpisodeHeaderComponent,
  ],
  providers: [],
})
export class EpisodesModule {}
