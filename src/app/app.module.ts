import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StandardOutcomesComponent } from './standard-outcomes/standard-outcomes.component';
import { OutcomesListItemComponent } from './standard-outcomes/outcomes-list-item/outcomes-list-item.component';

import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { OutcomeService } from './outcome.service';
import { SuggestionFilterComponent } from './standard-outcomes/suggestion-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    StandardOutcomesComponent,
    OutcomesListItemComponent,
    SuggestionFilterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    VirtualScrollerModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatButtonToggleModule,
  ],
  providers: [OutcomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
