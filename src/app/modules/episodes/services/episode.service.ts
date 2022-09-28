import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Pagination } from 'src/app/core/models/pagination.model';
import { environment } from 'src/environments/environment';
import { Character, Episode, EpisodeResponse } from '../../../core/models';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  // Private
  private readonly URL = environment.api;
  private _episodes: BehaviorSubject<Episode[] | null> = new BehaviorSubject<Episode[] | null>(null);
  private _characters: BehaviorSubject<Character[] | null> = new BehaviorSubject<Character[] | null>(null);
  private _episodesLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _charactersLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _episode: BehaviorSubject<Episode | null> = new BehaviorSubject<Episode | null>(null);
  private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject<Pagination | null>(null);

  constructor(private _httpClient: HttpClient) {}

  set episode(episode: Episode) {
    this._episode.next(episode);
  }

  get episode$(): Observable<Episode | null> {
    return this._episode.asObservable();
  }

  get characters$(): Observable<Character[] | null> {
    return this._characters.asObservable();
  }

  get episodes$(): Observable<Episode[] | null> {
    return this._episodes.asObservable();
  }

  get episodesLoading$(): Observable<boolean> {
    return this._episodesLoading.asObservable();
  }

  get charactersLoading$(): Observable<boolean> {
    return this._charactersLoading.asObservable();
  }

  get pagination$(): Observable<any> {
    return this._pagination.asObservable();
  }

  getEpisodesByPage = (page: string): Observable<any> => {
    this._episodesLoading.next(true);

    return this._httpClient
      .get<Episode[]>(`${this.URL}/episode`, {
        params: {
          page,
        },
      })
      .pipe(
        tap((data: any) => {
          const response: EpisodeResponse = data;
          if (!!!response.error) {
            const pageNumber = Number(page);
            const resultsPerPage = 20;
            const episodesCount = response.info.count;
            const begin = (pageNumber - 1) * resultsPerPage;
            const end = Math.min(resultsPerPage * pageNumber, episodesCount);

            const pagination: Pagination = {
              totalResults: episodesCount,
              resultsPerPage: resultsPerPage,
              currentPage: pageNumber,
              lastPage: response.info.pages,
              startIndex: begin,
              endIndex: end,
            };
            this._episodes.next(response.results);
            this._pagination.next(pagination);
          }
          this._episodesLoading.next(false);
        })
      );
  };

  getCharacters = (characterIds: number[]): Observable<any> => {
      this._charactersLoading.next(true);
      const ids = characterIds.join(',');

      return this._httpClient
        .get<Character[]>(`${this.URL}/character/${ids}`)
        .pipe(
          tap((data: any) => {
            if (!!!data.error) {
              this._characters.next(data);
            }
            this._charactersLoading.next(false);
          })
        )
  }
}
