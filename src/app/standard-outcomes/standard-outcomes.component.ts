import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { StandardOutcome } from '@cyber4all/clark-entity';
import { OutcomeService } from '..//outcome.service';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

export interface SuggestedOutcome extends StandardOutcome {
  suggested?: boolean;
}

@Component({
  selector: 'app-standard-outcomes',
  templateUrl: './standard-outcomes.component.html',
  styleUrls: ['./standard-outcomes.component.scss']
})
export class StandardOutcomesComponent implements OnChanges, OnDestroy {
  // id of the currently selected outcome
  @Input()
  activeOutcome: string;

  @Output()
  toggleMapping: EventEmitter<{
    standardOutcome: StandardOutcome;
    value: boolean;
  }> = new EventEmitter();

  searchStringValue = '';
  searchString$: BehaviorSubject<string> = new BehaviorSubject('');

  componentDestroyed$: Subject<void> = new Subject();

  suggestions: SuggestedOutcome[] = [];
  searchResults: SuggestedOutcome[] = [];

  selectedOutcomeIDs: string[] = [];

  activeOutcomeSubscription: Subscription;

  loading = undefined;

  filter = {
    author: undefined,
    date: undefined,
    name: undefined,
    text: undefined,
  };

  constructor(
    private outcomeService: OutcomeService
  ) {
    // handle searching
    this.searchString$
      .pipe(
        takeUntil(this.componentDestroyed$),
        debounceTime(650)
      )
      .subscribe((v) => {
        this.searchStringValue = v;
        this.performSearch();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activeOutcome && changes.activeOutcome.currentValue) {
      this.searchString$.next('');

      // if we have an open subscription to an outcome, close it
      if (this.activeOutcomeSubscription) {
        this.activeOutcomeSubscription.unsubscribe();
      }
    }
  }

  toggleStandardOutcome(standardOutcome: StandardOutcome, value: boolean) {
    this.toggleMapping.emit({ standardOutcome, value });
  }

  performSearch() {
    if ((!this.searchStringValue || this.searchStringValue === '') && !this.filter.name) {
      // string was empty, clear results
      this.searchResults = [];
    } else {
      // perform search
      this.loading = 'search';
      this.outcomeService
        .getOutcomes({
          ...this.filter,
          text: this.searchStringValue === '' ? ' ' : this.searchStringValue,
        })
        .then(results => {
          console.log('RESULTS: ', results);
          this.searchResults = results.outcomes;
          this.loading = undefined;
        });
    }
  }

  updateDate(e) {
    this.filter.date = e;
    this.performSearch();
  }

  updateSource(e) {
    this.filter.author = e;
    this.performSearch();
  }

  updateName(e) {
    this.filter.name = e;
    this.performSearch();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }
}
