import { Routes } from '@angular/router';
import { PostTweetComponent } from './components/post-tweet/post-tweet.component';
import { ShowUserTweetsComponent } from './components/show-user-tweets/show-user-tweets.component';
import { ShowUserComponent } from './components/show-user/show-user.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
      },
      {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full',
      },
      {
        path: 'forgot',
        component: ForgotComponent,
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full',
        canActivate: [authGuard],
      },
      {
        path: 'show-users',
        component: ShowUserComponent,
        pathMatch: 'full',
        canActivate: [authGuard],
      },
      {
        path: 'show-users/:username',
        component: ShowUserTweetsComponent,
        pathMatch: 'full',
        canActivate: [authGuard],
      },
      {
        path: 'postTweet',
        component: PostTweetComponent,
        pathMatch: 'full',
        canActivate: [authGuard],
      }
];
