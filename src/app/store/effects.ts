import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { RecordsService } from '../services/records.service';

@Injectable()
export class RecordsListEffects {

  fetchRecords$ = createEffect((): any => this.actions$.pipe(
    ofType('[RECORDS]::FETCH_REQUEST'),
    mergeMap(() => {
      return this.recordsService.fetchRecords().pipe(
        map((records) => ({ type: '[RECORDS]::FETCH_RECEIVE', records })),
        catchError((err) => of(`Error is occured: ${err}`))
      );
    }),
  ));

  createRecord$ = createEffect((): any => this.actions$.pipe(
    ofType('[RECORDS]::CREATE_REQUEST'),
    mergeMap(({ record }) => {
      return this.recordsService.addRecord(record).pipe(
        map(() => ({ type: '[RECORDS]::CREATE_RECEIVE', record })),
        catchError((err) => of(`Error is occured: ${err}`))
      );
    }),
  ));

  // In case of PUT requests for newly created items JSONPlaceholder API can't find them by ID and returns 500 ERROR.
  // So for the reason to change the State this error is supposed to be a positive response.
  updateRecord$ = createEffect((): any => this.actions$.pipe(
    ofType('[RECORDS]::UPDATE_REQUEST'),
    mergeMap(({ id, title, body }) => {
      return this.recordsService.updateRecord({ id, title, body }).pipe(
        map(() => ({ type: '[RECORDS]::UPDATE_RECEIVE', id, title, body })),
        catchError(() => of({ type: '[RECORDS]::UPDATE_RECEIVE', id, title, body }))
      );
    }),
  ));

  deleteRecord$ = createEffect((): any => this.actions$.pipe(
    ofType('[RECORDS]::DELETE_REQUEST'),
    mergeMap(({ id }) => {
      return this.recordsService.deleteRecord(id).pipe(
        map(() => ({ type: '[RECORDS]::DELETE_RECEIVE', id })),
        catchError((err) => of(`Error is occured: ${err}`))
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private recordsService: RecordsService,
  ) { }
}
