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
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';

import { OutcomeService } from './outcome.service';
import { SuggestionFilterComponent } from './standard-outcomes/suggestion-filter.component';
import { BrowseComponent } from './browse/browse.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    StandardOutcomesComponent,
    OutcomesListItemComponent,
    SuggestionFilterComponent,
    BrowseComponent,
    FooterComponent,
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
    MatInputModule,
    MatDividerModule,
    MatToolbarModule,
    MatTabsModule,
    MatSelectModule,
  ],
  providers: [OutcomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
