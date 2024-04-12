import { Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { HomeComponent } from '../pages/home/home.component';
import { ArticleComponent } from '../pages/article/article.component';
import { PreviewArticleComponent } from '../pages/preview-article/preview-article.component';
import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import { UserInfoComponent } from '../pages/user-info/user-info.component';
import { ErrorComponent } from '../shared/error/error.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent, 
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'article/:id',
        component: ArticleComponent,
      },
      {
        path: 'preview/:id',
        component: PreviewArticleComponent,
      },
      {
        path:'signIn',
        component: SignInComponent
      },
      {
        path:'signUp',
        component: SignUpComponent
      },
      {
        path: 'article/edit/:slug',
        component: ArticleComponent
      },
      {
        path: 'article/preview/:slug',
        component: PreviewArticleComponent
      },
      {
        path: 'article/create',
        component: ArticleComponent
      },
      {
        path: 'userinfo/:username',
        component: UserInfoComponent
      },
      { 
        path: '**',
        component: ErrorComponent
      }
    ],
  },
];
