import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { FullModule } from './full/full.module';
import { FinanceDetailModule } from './components/finance-detail/finance-detail.module';
 



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    FullModule,
    FinanceDetailModule
  ],
  exports:[FullModule]
})
export class UiModule { }
