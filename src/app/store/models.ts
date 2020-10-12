import { IRecord } from './../models/record.model';

export interface IState {
  ids: number[];
  records: { [id: number]: IRecord };
}

export interface IAppState {
  recordsList: IState;
}
