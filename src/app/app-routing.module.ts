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
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AccountComponent } from './components/account/account.component';
import { FundComponent } from './components/fund/fund.component';
import { FundconfirmComponent } from './components/fundconfirm/fundconfirm.component';

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
   {path: 'login', component: LoginComponent},
   {
     path: 'account', 
     component: AccountComponent, 
     canActivate: [ AuthGuardService ]     
   },
   {path: 'account/fund', component: FundComponent, canActivate: [ AuthGuardService ]},
   {path: 'account/fund/payment', component: FundconfirmComponent},
   {path: 'signup', component: SignupComponent},
   {path: "**", component: PagenotfoundComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
