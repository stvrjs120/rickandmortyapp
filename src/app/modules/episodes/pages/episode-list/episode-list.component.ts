import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Episode } from 'src/app/core';
import { EpisodeService } from '../../services';

@Component({
  selector: 'app-episode-list',
  host: { class: 'routed-component' },
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css'],
})
export class EpisodeListComponent implements OnInit {
  // @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  episodes$: Observable<Episode[] | null> = new Observable<null>();
  selectedEpisodeId: number = 0;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _episodeService: EpisodeService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.episodes$ = this._episodeService.episodes$.pipe(
      takeUntil(this._unsubscribeAll)
    );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Show episode
   *
   * @param episodeId
   */
  showEpisode(episodeId: number): void {
    this.selectedEpisodeId = episodeId;

    // Close the drawer on 'over' mode
    if (this.drawerMode === 'over') {
      // this.drawer.close();
    }
  }
}
