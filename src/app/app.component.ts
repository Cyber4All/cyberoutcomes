import { Component, OnInit } from '@angular/core';
import { OutcomeService } from './outcome.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cyberoutcomes';
  guidelines;
  displayedColumns: string[] = ['id', 'name', 'outcome', 'date'];

  constructor(private guidelineGateway: OutcomeService) {}

  ngOnInit(): void {
    this.guidelineGateway.getOutcomes({ author: 'CAE Cyber Defense' })
      .then(data => {
        console.log(data);
        this.guidelines = data.outcomes;
      })
      .catch(error => {
        console.error(error);
      });
  }
}
