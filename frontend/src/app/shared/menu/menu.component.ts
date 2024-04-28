import { Component, Input, OnInit } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router, RouterModule } from '@angular/router';
import { Observable, concatAll, concatMap, map, of, switchAll, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { getUserInfo } from '@app/store/selectors/userInfoSelectors';
import { AppState, INotification, IUserInfo } from '@app/store/types';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { UserInfoActionsByReducer } from '@app/store/actions/userInfoActions';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NzGridModule, NzButtonModule, RouterModule, NzTypographyModule, NzIconModule, AsyncPipe, NzAvatarModule, NgIf, NgTemplateOutlet ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  userInfo$: Observable<IUserInfo>;
  avatarUrl$: Observable<string>;
  username$: Observable<string>;

  @Input() message!: string;
  @Input() openNotification!: (data: INotification) => void;

  constructor(private store: Store<AppState>, private router: Router) { 
    this.userInfo$ = this.store.select(getUserInfo);
    this.avatarUrl$ = this.userInfo$.pipe(map(user => user.avatarUrl))
    this.username$ = this.userInfo$.pipe(map(user => user.username))
  }

  ngOnInit(): void {
    const refresh_token = localStorage.getItem('refresh_token') ?? undefined
    this.userInfo$.pipe(concatMap(user => of(!user?.username && refresh_token)), take(1)).subscribe(user => {
      this.store.dispatch(UserInfoActionsByReducer.signInAction({
        payload: {
          openNotification:this.openNotification,
          navigate: this.router.navigate,
          refresh_token,
        }
      })) 
    })
  }


  handleRedirectHome(){
		this.router.navigate(['/home']);
	}

  handleRedirectSignInModal(){
		this.router.navigate(['/signIn'])
	}
	handleRedirectUserInfoModal(userInfo$: Observable<IUserInfo>){
    userInfo$.pipe(concatMap(user => of(user)), take(1)).subscribe(user => {
      this.router.navigate(['/userInfo', user.username], {
        queryParams:{
          tab: 'user-content'
        },
      });
    })
	}

}
function mapAll(): import("rxjs").OperatorFunction<IUserInfo, unknown> {
  throw new Error('Function not implemented.');
}

