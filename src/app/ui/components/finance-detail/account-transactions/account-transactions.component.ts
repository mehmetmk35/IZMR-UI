import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { FinanceService } from 'src/app/services/model/finance.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/toastr.services/custom-toastr.service';


@Component({
  selector: 'app-account-transactions',
  templateUrl: './account-transactions.component.html',
  styleUrls: ['./account-transactions.component.scss']
})
export class AccountTransactionsComponent extends  BaseComponent  implements OnInit {
  @Input() invoiceNumber: string;
  // @Input() rowData: object; 
  productIdBySupplier: number;
  // productsData: DataSource;
  detailInvoiceData: DataSource;

  constructor(private financeService: FinanceService,spinner:NgxSpinnerService,private customToastrService: CustomToastrService) {
    super(spinner);
    this.detailInvoiceData = new DataSource({
      store: []
    })


  }
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallScaleMultiple)
    await this.financeService.getDetailInvoice(this.invoiceNumber, (data) => { 
      this.detailInvoiceData = data.detailInvoice 
      this.hideSpinner(SpinnerType.BallScaleMultiple)
    
    }, (message: string) => { 

      this.customToastrService.message(message,"Hata",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight})
      this.hideSpinner(SpinnerType.BallScaleMultiple)
    })
  }
  // handleValueChange(e: DxSelectBoxTypes.ValueChangedEvent) {
  //   this.productIdBySupplier = e.value;
  //   this.orderHistoryData = new DataSource({
  //     store: AspNetData.createStore({
  //       key: 'OrderID',
  //       loadParams: { ProductID: e.value },
  //       loadUrl: `${this.url}/GetOrdersByProduct`,
  //     }),
  //   });
  // }

  // customizeItemTemplate(item: DxFormTypes.SimpleItem) {
  //   item.template = 'formItem';
  // }

}
