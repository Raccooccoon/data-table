import { createAction, props } from '@ngrx/store';

import { IRecord } from './../models/record.model';

export const FETCH_REQUEST = createAction(
  '[RECORDS]::FETCH_REQUEST'
);

export const FETCH_RECEIVE = createAction(
  '[RECORDS]::FETCH_RECEIVE',
  props<{ records: IRecord[] }>()
);

export const CREATE_REQUEST = createAction(
  '[RECORDS]::CREATE_REQUEST',
  props<{ record: IRecord }>()
);

export const CREATE_RECEIVE = createAction(
  '[RECORDS]::CREATE_RECEIVE',
  props<{ record: IRecord }>()
);

export const UPDATE_REQUEST = createAction(
  '[RECORDS]::UPDATE_REQUEST',
  props<{ id: number, title: string, body: string }>()
);

export const UPDATE_RECEIVE = createAction(
  '[RECORDS]::UPDATE_RECEIVE',
  props<{ id: number, title: string, body: string }>()
);

export const DELETE_REQUEST = createAction(
  '[RECORDS]::DELETE_REQUEST',
  props<{ id: number }>()
);

export const DELETE_RECEIVE = createAction(
  '[RECORDS]::DELETE_RECEIVE',
  props<{ id: number }>()
);
