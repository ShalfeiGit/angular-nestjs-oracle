import api from '@app/store/api/api';
import { OtherAuthorInfoActionsByReducer } from '../actions/otherAuthorInfoActions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { from, map, switchMap } from 'rxjs';

export const getOtherAuthorInfoAction =  createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(OtherAuthorInfoActionsByReducer.getOtherAuthorInfoAction),
      switchMap(({payload}) =>{
        const { username } = payload
        return from(api({ method: 'get', url: `user/author/${username}` })).pipe(
          map((response) => {
            if(response.status >= 400){
              return OtherAuthorInfoActionsByReducer.getOtherAuthorInfoAction_rejected({ payload: response })
            }	else {
              return OtherAuthorInfoActionsByReducer.getOtherAuthorInfoAction_fulfilled({ payload: response})
            }
          })
        )
      })
    );
  },
  { functional: true }
);
