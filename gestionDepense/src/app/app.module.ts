import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { AddSpentComponent } from './add-spent/add-spent.component';

import { SpentDataService } from './service/spent-data.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpServerService } from './service/http-server.service';
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './sign-in/sign-in.component';
import { MainAppComponent } from './main-app/main-app.component';
import { AuthService } from './service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuardService } from './service/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HeaderComponent,
    MainContentComponent,
    AddSpentComponent,
    PageNotFoundComponent,
    SignInComponent,
    MainAppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [SpentDataService, HttpServerService, , CookieService, AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
