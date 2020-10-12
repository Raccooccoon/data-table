import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ClarityModule } from '@clr/angular';

import { AppComponent } from './app.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { DeleteAlertComponent } from './components/alerts/delete-alert/delete-alert.component';
import { SubmitAlertComponent } from './components/alerts/submit-alert/submit-alert.component';
import { RecordsListEffects } from './store/effects';
import { reducer } from './store/reducer';

@NgModule({
  declarations: [
    AppComponent,
    DataListComponent,
    ModalWindowComponent,
    DeleteAlertComponent,
    SubmitAlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ClarityModule,
    StoreModule.forRoot({ recordsList: reducer }),
    EffectsModule.forRoot([RecordsListEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
