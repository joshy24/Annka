import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { CreateportfolioComponent } from './components/createportfolio/createportfolio.component';

import { BitrexService } from './services/bitrex.service';
import { CurrencyService } from './services/currency.service';
import { PiedataService } from './services/piedata.service';
import { AuthService } from './services/auth-service.service'
import { AuthGuardService } from './services/auth-guard-service.service';
import { AccountService } from './services/account.service';
import { PortfolioService } from './services/portfolio.service';
import { ResourceService } from './services/resource.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { JWTInterceptor } from './helpers/jwt.interceptor';

import { Angular4PaystackModule } from 'angular4-paystack';

import { HttpClientModule } from '@angular/common/http';
import { CurrencyComponent } from './components/currency/currency.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { PriceitemComponent } from './components/priceitem/priceitem.component';

import { BsModalModule } from 'ng2-bs3-modal';
import { PortfolioitemComponent } from './components/portfolioitem/portfolioitem.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PiechartComponent } from './components/piechart/piechart.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AccountComponent } from './components/account/account.component';
import { PortfolioallComponent } from './components/portfolioall/portfolioall.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PortfoliopreComponent } from './components/portfoliopre/portfoliopre.component';
import { FundComponent } from './components/fund/fund.component';
import { FundconfirmComponent } from './components/fundconfirm/fundconfirm.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateportfolioComponent,
    CurrencyComponent,
    PurchaseComponent,
    PriceitemComponent,
    PortfolioitemComponent,
    PortfolioComponent,
    PiechartComponent,
    PagenotfoundComponent,
    AccountComponent,
    PortfolioallComponent,
    LoginComponent,
    SignupComponent,
    PortfoliopreComponent,
    FundComponent,
    FundconfirmComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BsModalModule,
    Angular4PaystackModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BitrexService,
    CurrencyService,
    PiedataService,
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    },
    AccountService,
    PortfolioService,
    ResourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
