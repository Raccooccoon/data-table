import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
  public recordID: string;
  public actionName: string;
  public isModalOpened: boolean;
  public isEditMode: boolean;
  public isValidInput = true;

  public records$: Observable<{ [id: number]: IRecord }> = this.store.select(selectors.selectRecords);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecordsList.IAppState>
  ) { }

  public ngOnInit(): void {
    this.isModalOpened = true;
    this.recordID = this.route.snapshot.paramMap.get('id');

    this.records$.pipe(
      tap((records) => {
        if (this.recordID !== 'add') {
          this.record = records[this.recordID];
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
    this.isModalOpened = false;
    this.router.navigate(['/']);
  }

  public onClear(): void {
    this.isModalOpened = false;
    this.router.navigate(['/']);
  }

  private uuid(): number {
    return Math.floor(Math.random() * 100000);
  }
}