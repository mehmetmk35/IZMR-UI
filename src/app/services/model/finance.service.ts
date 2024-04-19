import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client-service';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Invoice } from 'src/app/contracts/List_Invoice';
import { List_Detail_Invoice } from 'src/app/contracts/list-detailInvoice';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private httpClinet:HttpClientService) { }

  async getInvoice(page:number=0,size:number=5,succesCallBac?:(data:any)=>void,errorCallBack?:(errorMessage:string)=>void) : Promise<{ invoiceCount: number; invoice: List_Invoice[]}> 
  {
   const observable: Observable<{ invoiceCount: number; invoice: List_Invoice[] }>  =this.httpClinet.get({
      controller:'Invoice',
      queryString:`page=${page}&size=${size}`
   });

    
   const promisData=firstValueFrom(observable);
   promisData.then(data=>succesCallBac(data))
   .catch(error=>{  
    errorCallBack(error)});
    return await promisData;

  }

  async getDetailInvoice(InvoiceNumber:string,succesCallBac?:(data:any)=>void,errorCallBack?:(errorMessage:string)=>void)
  {

    const observable:Observable<{detailInvoiceCount:number,detailInvoice:List_Detail_Invoice}>=this.httpClinet.get({
      controller:"Invoice",
      action:"detail",
      queryString:`InvoiceNumber=${InvoiceNumber}`
    });
    const promisData=firstValueFrom(observable);
  
    promisData.then(data=>succesCallBac(data))
    .catch(error=>errorCallBack(error));
    return await promisData;
  }
}
