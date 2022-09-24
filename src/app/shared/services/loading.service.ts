import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  _loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {}

  get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  set loading(loading: boolean) {
    this._loading.next(loading);
  }
}
