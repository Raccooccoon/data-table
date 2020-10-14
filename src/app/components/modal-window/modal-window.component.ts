import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IRecord } from './../../models/record.model';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as fromRecordsList from '../../store/models';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {
  @ViewChild('title') title: ElementRef;
  @ViewChild('body') body: ElementRef;

  public record: IRecord;
  public records: { [id: number]: IRecord };
  public selectedID: number | null;
  public actionName: string;
  public isEditMode: boolean;
  public isValidInput = true;

  public records$: Observable<{ [id: number]: IRecord }> = this.store.select(selectors.selectRecords);
  public selectedID$: Observable<number | null> = this.store.select(selectors.selectByID);

  constructor(
    private store: Store<fromRecordsList.IAppState>
  ) { }

  public ngOnInit(): void {
    this.selectedID$.pipe(tap((id) => this.selectedID = id)).subscribe();

    this.records$.pipe(
      tap((records) => this.records = records),
      tap((records) => {
        if (this.selectedID !== -1) {
          this.record = records[this.selectedID];
          this.actionName = 'Редактирование записи';
          this.isEditMode = true;
        } else {
          this.record = { id: this.uuid(), title: '', body: '' };
          this.actionName = 'Добавление записи';
        }
      })
    ).subscribe();
  }

  public onSubmit(): void {
    this.isValidInput = true;

    const record: IRecord = {
      id: this.record.id,
      title: this.title.nativeElement.value.trim(),
      body: this.body.nativeElement.value.trim()
    };

    if (!record.title.length || !record.body.length) {
      this.isValidInput = false;
      return;
    }

    if (this.isEditMode) {
      this.store.dispatch(actions.UPDATE_REQUEST({ ...record }));
      this.isEditMode = false;
    } else {
      this.store.dispatch(actions.CREATE_REQUEST({ record }));
    }
  }

  public onClear(): void {
    this.store.dispatch(actions.SELECT_ID({ id: null }));
  }

  private uuid(): number {
    const id = Math.floor(Math.random() * 10000);
    console.log(this.records)
    return this.records[id] === undefined ? id : this.uuid();
  }
}
