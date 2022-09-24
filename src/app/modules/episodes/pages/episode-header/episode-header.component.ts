import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Pagination } from 'src/app/core';
import { EpisodeService } from '../../services';

@Component({
  selector: 'app-episode-header',
  templateUrl: './episode-header.component.html',
  styleUrls: ['./episode-header.component.css'],
})
export class EpisodeHeaderComponent implements OnInit {
  pagination: Pagination = {
    totalResults: 0,
    resultsPerPage: 0,
    currentPage: 0,
    lastPage: 0,
    startIndex: 0,
    endIndex: 0,
  };

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _episodeService: EpisodeService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._episodeService.pagination$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((pagination) => {
        this.pagination = pagination;
      });
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
