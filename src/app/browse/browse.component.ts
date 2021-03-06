import { Component, OnInit, ViewChild } from '@angular/core';
import { OutcomeService } from '../outcome.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { StandardOutcome } from '@cyber4all/clark-entity';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  sources: string[];
  currentSource: string;
  displayedColumns: string[] = ['name', 'outcome', 'date'];
  dataSource: MatTableDataSource<StandardOutcome>;
  search$ = new Subject<string>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private guidelineGateway: OutcomeService) { }

  ngOnInit(): void {
    this.search$
      .pipe(
        debounceTime(650),
      )
      .subscribe(searchQuery => {
        this.applyFilter(searchQuery);
      });
    this.guidelineGateway.getSources()
      .then(sources => this.sources = sources)
      .then(() => this.selectSource(this.sources[0]))
      .catch(error => console.error(error));
  }

  selectSource(source: string) {
    console.log('SOURCE', source);
    this.currentSource = source;
    this.guidelineGateway.getOutcomes({ author: source })
      .then(data => {
        this.buildDataSource(data.outcomes);
      })
      .catch(error => {
        console.error(error);
      });
  }

  private buildDataSource(outcomes: StandardOutcome[], filter?: string) {
    this.dataSource = new MatTableDataSource(outcomes);
    this.paginator.firstPage();
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
