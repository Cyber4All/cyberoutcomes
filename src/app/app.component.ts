import { Component, OnInit, ViewChild } from '@angular/core';
import { OutcomeService } from './outcome.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { StandardOutcome } from '@cyber4all/clark-entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cyberoutcomes';
  guidelines;
  sources: string[];
  currentSource: string;
  isLoadingResults = false;
  displayedColumns: string[] = ['name', 'outcome', 'date'];
  dataSource: MatTableDataSource<StandardOutcome>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private guidelineGateway: OutcomeService) {}

  ngOnInit(): void {
    this.guidelineGateway.getSources()
      .then(sources => this.sources = sources)
      .then(() => this.selectSource(this.sources[0]))
      .catch(error => console.error(error));
  }

  selectSource(source: string) {
    this.currentSource = source;
    this.guidelineGateway.getOutcomes({ author: source })
    .then(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data.outcomes);
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    })
    .catch(error => {
      console.error(error);
    });
  }
}
