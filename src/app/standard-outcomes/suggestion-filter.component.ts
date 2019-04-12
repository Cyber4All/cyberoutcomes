import { Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { OutcomeService } from '../outcome.service';

@Component({
    selector: 'app-suggestion-filter',
    template: `
        <section class="suggestion-filter-wrapper">
            <div class="filter-container">
                <div class="flex-item">
                    <label for="author-filter">Author</label>
                    <div class="select-wrapper">
                        <select name="author-filter" (change)="sourceChanged($event.target.value)">
                            <option value="{{s}}" *ngFor="let s of sources">{{ s }}</option>
                        </select>
                    </div>
                </div>
                <div class="flex-item">
                    <label for="date-filter">Date Published</label>
                    <div class="select-wrapper">
                    <select name="date-filter" (change)="dateChanged($event.target.value)">
                        <option value="{{d}}" *ngFor="let d of dates">{{ d }}</option>
                    </select>
                    </div>
                </div>
            </div>
            <div class="outcome-name-filter">
                <label for="name-filter">Area</label>
                <select name="name-filter" (change)="nameChanged($event.target.value)" [disabled]="sourceNotSpecified">
                    <option value="{{a}}" *ngFor="let a of areas">{{ a }}</option>
                </select>
            </div>
        </section>
    `,
    styles: [
        `.filter-container {
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            -webkit-flex-direction: row;
            margin-bottom: 30px;
        }`,
        `
      .suggestion-filter-wrapper {
        display: flex;
        flex-direction: column;
      }
      .flex-item {
        flex: 1;
        display: flex;
        justify-content: center;
      }

      .outcome-name-filter {
          display: flex;
          width: 80%;
          align-self: center;
      }

      .flex-item:nth-of-type(1) {
        margin-left: 0
      }

      input, select {
        flex: 1;
      }

      select {
        background: white;
      }

      .select-wrapper .svg-inline--fa {
        z-index: 1;
      }

      label {
        padding-top: 5px;
        margin-right: 10px;
      }
      `
    ]
})
export class SuggestionFilterComponent implements OnInit {

    sources: string[];
    sourceNotSpecified = true;
    areasBySource: { _id: string, areas: string[] }[];
    areas = ['Any'];
    // FIXME: Fetch dates from API
    dates = [
        'Any',
        '2019',
        '2017',
        '2014',
        '2013'
    ];
    _name: any;

    @Output() source = new EventEmitter<string>();
    @Output() date = new EventEmitter<number>();
    @Output() name = new EventEmitter<string>();

    constructor(private outcomeService: OutcomeService) {
        this.outcomeService.getSources().then(s => this.sources = ['Any', ...s]);
        this.outcomeService.getAreas().then(a => {
            // this.areas = ['Any', ...a]
            this.areasBySource = a;
            console.log(a);
        });
    }

    ngOnInit() { }

    sourceChanged(source: string) {
        const value = source === 'Any' ? undefined : source;
        if (value /*&& this.areaShouldShow(value) */) {
            for (const a of this.areasBySource) {
                if (a._id === value) {
                    console.log(`${a._id} has areas to show`);
                    this.areas = ['Any', ...a.areas];
                    this.sourceNotSpecified = false;
                }
            }
        } else {
            this.sourceNotSpecified = true;
            this.areas = ['Any'];
            this.nameChanged(null);
        }
        this.source.next(value);
    }

    dateChanged(date: string) {
        const value = date === 'Any' ? undefined : parseInt(date, 10);
        this.date.next(value);
    }

    nameChanged(name: string) {
        const value = name === 'Any' ? undefined : name;
        this.name.next(value);
    }

    private areaShouldShow(_id: string) {
        // FIXME: Remove once better option is in place
        const noShows = [
            'GenCyber-Concepts',
            'GenCyber-Principles',
            'NCWF KSAs',
            'NCWF Tasks'
        ];
        return !noShows.includes(_id);
    }
}
