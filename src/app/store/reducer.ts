import { Action, createReducer, on } from '@ngrx/store';

import { IState } from './models';
import * as actions from './actions';

const initialState: IState = {
  ids: [],
  records: {}
};

const recordReducer = createReducer(
  initialState,

  on(actions.FETCH_RECEIVE, (state, { records }) => {
    const fetchedIDs = records.map((record) => record.id);
    const fetchedRecords = {};
    records.forEach((record) => fetchedRecords[record.id] = record);
    return {
      ...state,
      ids: fetchedIDs,
      records: fetchedRecords
    };
  }),

  on(actions.CREATE_RECEIVE, (state, { record }) => ({
    ...state,
    ids: [...state.ids, record.id],
    records: { ...state.records, [record.id]: record }
  })),

  on(actions.UPDATE_RECEIVE, (state, { id, title, body }) => ({
    ...state,
    records: { ...state.records, [id]: {...state.records[id], title, body }}
  })),

  on(actions.DELETE_RECEIVE, (state, { id }) => {
    const filteredIds = state.ids.filter((elem) => elem !== id);
    const clonedRecords = { ...state.records };
    delete clonedRecords[id];
    return {
      ...state,
      ids: filteredIds,
      records: clonedRecords
    };
  })
);

export function reducer(state: IState, action: Action) {
  return recordReducer(state, action);
}