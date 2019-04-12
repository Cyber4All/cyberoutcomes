import { Component, OnInit, ViewChild } from '@angular/core';
import { OutcomeService } from './outcome.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { StandardOutcome } from '@cyber4all/clark-entity';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cyberoutcomes';
  guidelines;
  isLoadingResults = false;

  constructor(private guidelineGateway: OutcomeService) { }

}
