import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { CreateportfolioComponent } from './components/createportfolio/createportfolio.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { PortfolioallComponent } from './components/portfolioall/portfolioall.component';
import { AuthGuardService } from './services/auth-guard-service.service'
import { UnauthGuardService } from './services/unauth-guard-service.service'
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AccountComponent } from './components/account/account.component';
import { FundComponent } from './components/fund/fund.component';
import { FundconfirmComponent } from './components/fundconfirm/fundconfirm.component';
import { CashoutComponent } from './components/cashout/cashout.component'
import { TransactionComponent } from './components/transaction/transaction.component';
import { CashoutwalletComponent } from './components/cashoutwallet/cashoutwallet.component'
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { GuidelinesComponent } from './components/guidelines/guidelines.component';

const routes: Routes = [
   //{path: '', redirectTo: '/#', pathMatch: 'full'},
   {path: '', component: HomeComponent},
   {path: 'portfolio/new/:currency', component: PurchaseComponent,pathMatch: 'full', canActivate: [ AuthGuardService ]},
   {path: 'portfolio/all', component: PortfolioallComponent,canActivate: [ AuthGuardService ],pathMatch: 'full'},
   {
    path: 'portfolio/:portfolio', 
    component: PortfolioComponent,
    canActivate: [ AuthGuardService ],
    children: [
        {
          path: 'edit',
          component: PortfolioComponent
        },
        {
          path: 'delete',
          component: PortfolioComponent
        }
      ]		
   },
   {path: 'login', component: LoginComponent, canActivate: [ UnauthGuardService ]},
   {
     path: 'account', 
     component: AccountComponent, 
     canActivate: [ AuthGuardService ]     
   },
   {path: 'pendingtransactions', component: TransactionComponent, canActivate: [ AuthGuardService ]},
   {path: 'account/fund', component: FundComponent, canActivate: [ AuthGuardService ]},
   {path: 'account/fund/payment', component: FundconfirmComponent},
   {path: 'signup', component: SignupComponent, canActivate: [ UnauthGuardService ]},
   {path: "cashout/:portfolio/:asset", component:CashoutComponent, canActivate: [ AuthGuardService ]},
   {path: "cashout/wallet", component:CashoutwalletComponent, canActivate: [ AuthGuardService ]},
   {path: "forgotpassword", component:ForgotpasswordComponent, canActivate: [ UnauthGuardService ]},
   {path: "guidelines", component:GuidelinesComponent},
   {path: "**", component: PagenotfoundComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
