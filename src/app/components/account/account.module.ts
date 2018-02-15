import { NgModule } from '@angular/core';

import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountRoutingModule } from './/account-routing.module';

import { AccountComponent } from '../../components/account/account.component';
import { FundComponent } from '../../components/fund/fund.component';

@NgModule({
  declarations: [
    AccountComponent,
    FundComponent
  ],
  imports: [
    AccountRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
      
  ]
})
export class AccountModule { }
