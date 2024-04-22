import { Component, OnInit } from '@angular/core';
import { ArticleActionsByReducer } from '@app/store/actions/articleActions';
import { getGroupArticles } from '@app/store/selectors/articleSelectors';
import { AppState, DynamicObject } from '@app/store/types';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  count$: Observable<DynamicObject>;
  constructor(private store: Store<AppState>) {
    this.count$ = store.select(getGroupArticles);
  }

  ngOnInit() {
    this.store.dispatch(ArticleActionsByReducer.loadArticleAction({payload: {page: 1, limit: 10}}) )
    // this.count$.subscribe((el) => {
    //   debugger
    // })
  }
}
