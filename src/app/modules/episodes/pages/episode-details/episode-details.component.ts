import { Component, HostBinding, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Character, Episode } from 'src/app/core';
import { EpisodeService } from '../../services';
import { EpisodeListComponent } from '../episode-list';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.css'],
})
export class EpisodeDetailsComponent implements OnInit {
  @HostBinding('class.routed-component')
  routed_component: boolean = true;
  characterIds: number[] | undefined = [];
  
  episode$: Observable<Episode | null> = new Observable<null>();
  characters$: Observable<Character[] | null> = new Observable<null>();
  loadingCharacters$: Observable<boolean> = new Observable<false>();
  
  constructor(private _episodeService: EpisodeService,
    public episodeListComponent: EpisodeListComponent) {
    this.characters$ = this._episodeService.characters$;
    this.episode$ = this._episodeService.episode$;
    this.loadingCharacters$ = this._episodeService.charactersLoading$;
    this._episodeService.episode$
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
        alert("There are no characters to retrieve!");
      }
    })
  }

  ngOnInit() {}
}
