import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IRecord } from './../models/record.model';

const baseUrl = 'https://jsonplaceholder.typicode.com/posts';
const updateUrl = (id: number) => `${baseUrl}/${id}`;
const deleteUrl = (id: number) => `${baseUrl}/${id}`;

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private http: HttpClient) { }

  public fetchRecords(): Observable<IRecord[]> {
    return this.http.get<IRecord[]>(baseUrl);
  }

  public addRecord(record: IRecord): Observable<IRecord> {
    return this.http.post<IRecord>(baseUrl, record);
  }

  public updateRecord(record: IRecord): Observable<IRecord> {
    return this.http.put<IRecord>(updateUrl(record.id), record);
  }

  public deleteRecord(id: number): Observable<IRecord> {
    return this.http.delete<IRecord>(deleteUrl(id));
  }
}
