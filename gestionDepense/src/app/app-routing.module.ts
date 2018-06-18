import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { AddSpentComponent } from './add-spent/add-spent.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MainAppComponent } from './main-app/main-app.component';
import { AuthGuardService } from './service/auth-guard.service';

const appRoutes: Routes = [
  {path: 'login', component: SignInComponent},
  {path: 'spent', canActivate: [AuthGuardService], component: MainAppComponent, children: [
    {path: 'add', component: AddSpentComponent},
    {path: 'list', component: MainContentComponent}
  ] },
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
