import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { Episode } from '../../../core/models';
import { EpisodeService } from './episode.service';

@Injectable({
  providedIn: 'root',
})
export class EpisodeResolversService implements Resolve<any> {
  constructor(
    private _episodeService: EpisodeService,
    private _router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Episode[]> | any {
    const page: string = route.paramMap.get('page') ?? '1';

    return this._episodeService.getEpisodesByPage(page).pipe(
      finalize(() => {
        let currentRoute = route;
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
      }),
      catchError((error) => {
        console.error(error.message);

        // Get the parent url and append the first page number to the parent url
        const url = state.url.split('/').slice(0, -1).join('/') + '/1';
        this._router.navigateByUrl(url);

        return throwError(error);
      })
    );
  }
}
