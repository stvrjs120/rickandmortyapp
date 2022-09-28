import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Episode } from 'src/app/core';
import { EpisodeService } from '../../services';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css'],
})
export class EpisodeListComponent implements OnInit {
  @HostBinding('class.routed-component')
  routed_component: boolean = true;

  @ViewChild(MatDrawer, { static: false }) drawer! : MatDrawer;
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
    
    this._episodeService.episode$
    .subscribe(episode => {
      this.selectedEpisodeId = episode != null ? episode.id : 0;
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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Show episode
   *
   * @param episodeId
   */
  showEpisode(episode: Episode): void {
    this._episodeService.episode = episode;

    // Close the drawer on 'over' mode
    if (this.drawerMode === 'over') {
      this.drawer.close();
    }
  }
}
