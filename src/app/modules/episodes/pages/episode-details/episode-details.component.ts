import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, Subject, takeUntil, throwError } from 'rxjs';
import { Character, Episode } from 'src/app/core';
import { EpisodeService } from '../../services';
import { EpisodeListComponent } from '../episode-list';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
})
export class EpisodeDetailsComponent implements OnDestroy {
  @HostBinding('class.routed-component')
  routed_component: boolean = true;
  characterIds: number[] | undefined = [];
  
  episode$: Observable<Episode | null> = new Observable<null>();
  characters$: Observable<Character[] | null> = new Observable<null>();
  loadingCharacters$: Observable<boolean> = new Observable<false>();
  
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  constructor(
    private _episodeService: EpisodeService,
    public episodeListComponent: EpisodeListComponent,
    private _router: Router,) {
    this.characters$ = this._episodeService.characters$
      .pipe(takeUntil(this._unsubscribeAll));
    this.episode$ = this._episodeService.episode$
      .pipe(takeUntil(this._unsubscribeAll));
    this.loadingCharacters$ = this._episodeService.charactersLoading$
      .pipe(takeUntil(this._unsubscribeAll));
    this._episodeService.episode$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(episode => {
        this.characterIds = episode?.characters.reduce((array: number[], character) => {
          const split = character.split('/');
          array.push(Number(split[5]));
          return array;
        }, []);

        if (this.characterIds)
          this._episodeService.getCharacters(this.characterIds)
          .pipe(
            catchError((error) => {
              console.error(error);
              alert(error);
              return throwError(error);
            })
          ).subscribe()
        else {
          console.error("There are no characters to retrieve!");
          this._router.navigate(['..']);
          // alert("There are no characters to retrieve!");
        }
      })
  }

  /**
   * On destroy
   */
   ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
