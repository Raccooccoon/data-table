import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IRecord } from './../../models/record.model';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as fromRecordsList from '../../store/models';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
  public ids: number[];
  public records: { [id: number]: IRecord };

  public ids$: Observable<number[]> = this.store.select(selectors.selectRecordsIDs);
  public records$: Observable<{ [id: number]: IRecord }> = this.store.select(selectors.selectRecords);

  constructor(private store: Store<fromRecordsList.IAppState>) { }

  public ngOnInit(): void {
    this.store.dispatch(actions.FETCH_REQUEST());
    this.ids$.pipe(tap((ids) => this.ids = ids)).subscribe();
    this.records$.pipe(tap((records) => this.records = records)).subscribe();
  }
}
