import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { BitrexService } from './services/bitrex.service';
import { CurrencyService } from './services/currency.service';
import { PiedataService } from './services/piedata.service';
import { AuthService } from './services/auth-service.service'
import { AuthGuardService } from './services/auth-guard-service.service';
import { UnauthGuardService } from './services/unauth-guard-service.service';
import { AccountService } from './services/account.service';
import { PortfolioService } from './services/portfolio.service';
import { ResourceService } from './services/resource.service';
import { NameService } from './services/name.service'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { JWTInterceptor } from './helpers/jwt.interceptor';
import { ResponseInterceptor } from './helpers/response.interceptor'

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
import { SearchComponent } from './components/search/search.component';
import { EditaccountComponent } from './components/editaccount/editaccount.component';
import { AccountVerifyComponent } from './components/account-verify/account-verify.component';
import { CashoutComponent } from './components/cashout/cashout.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { PendingitemComponent } from './components/pendingitem/pendingitem.component';
import { CashoutwalletComponent } from './components/cashoutwallet/cashoutwallet.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { GuidelinesComponent } from './components/guidelines/guidelines.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MessageComponent } from './components/message/message.component';
import { TransactionmessageComponent } from './components/transactionmessage/transactionmessage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    FundconfirmComponent,
    SearchComponent,
    EditaccountComponent,
    AccountVerifyComponent,
    CashoutComponent,
    TransactionComponent,
    PendingitemComponent,
    CashoutwalletComponent,
    ForgotpasswordComponent,
    GuidelinesComponent,
    SnackbarComponent,
    MessageComponent,
    TransactionmessageComponent
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
    UnauthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    AccountService,
    PortfolioService,
    ResourceService,
    NameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
