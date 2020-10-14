import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as actions from '../../../store/actions';
import * as fromRecordsList from '../../../store/models';
import * as selectors from '../../../store/selectors';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.css']
})
export class DeleteAlertComponent implements OnInit {
  public selectedID: number | null;

  public selectedID$: Observable<number | null> = this.store.select(selectors.selectByID);

  constructor(
    private store: Store<fromRecordsList.IAppState>
  ) { }

  public ngOnInit(): void {
    this.selectedID$.pipe(tap((id) => this.selectedID = id)).subscribe();
  }

  public onCancel(): void {
    this.store.dispatch(actions.SELECT({ id: null }));
  }

  public onDelete(): void {
    this.store.dispatch(actions.DELETE_REQUEST({ id: this.selectedID }));
  }
}
