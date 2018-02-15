import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '../../components/account/account.component';
import { FundComponent } from '../../components/fund/fund.component';
import { AuthGuardService } from '../../services/auth-guard-service.service'

const childRoutes: Routes = [
   {
     path: 'account', 
     component: AccountComponent, 
     canActivate: [ AuthGuardService ],
     children: [
       {
         path: 'fund',
         component: FundComponent
       }
     ]
   }
];

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class AccountRoutingModule { }
