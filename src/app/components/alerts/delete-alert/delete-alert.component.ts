import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import * as actions from '../../../store/actions';
import * as fromRecordsList from '../../../store/models';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.css']
})
export class DeleteAlertComponent implements OnInit {
  public recordID: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecordsList.IAppState>
  ) { }

  public ngOnInit(): void {
    this.recordID = +this.route.snapshot.paramMap.get('id');
  }

  public onCancel(): void {
    this.router.navigate(['/']);
  }

  public onDelete(id: number): void {
    this.store.dispatch(actions.DELETE_REQUEST({ id }));
    this.router.navigate(['/']);
  }
}
