import { Routes, UrlSegment } from '@angular/router';
import { EpisodeResolversService } from 'src/app/modules/episodes/services';
import {
  EpisodeDetailsComponent,
  EpisodeEmptyComponent,
  EpisodeListComponent,
} from './pages';

const episodeRouteMatcher = (url: UrlSegment[]) => {
  let consumed = url;

  if (url[0].path !== 'page') return null;

  // Remove the id if exists
  if (url[2]) {
    consumed = url.slice(0, -1);
  }

  const urlSegment = {
    consumed: consumed,
    posParams: {
      page: new UrlSegment(url[1].path, {}),
    },
  };

  return urlSegment;
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'page/1',
    pathMatch: 'full',
  },
  {
    path: ':page',
    redirectTo: ':page/1',
    pathMatch: 'full',
  },
  {
    component: EpisodeListComponent,
    matcher: episodeRouteMatcher,
    resolve: { episodes: EpisodeResolversService },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EpisodeEmptyComponent,
      },
      {
        path: ':id',
        component: EpisodeDetailsComponent,
      },
    ],
  },
];
