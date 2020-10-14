import { createSelector } from '@ngrx/store';

import { IAppState, IState } from './models';

export const selectRecordsState = (state: IAppState) => state.recordsList;

export const selectRecords = createSelector(
  selectRecordsState,
  (state: IState) => state.records
);

export const selectRecordsIDs = createSelector(
  selectRecordsState,
  (state: IState) => state.ids
);

export const selectByID = createSelector(
  selectRecordsState,
  (state: IState) => state.selected
);
