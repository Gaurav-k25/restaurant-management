import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

  constructor(private service:OrderService,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?:NgForm){
    if(form=null)
    form.resetForm();
    this.service.formData={
      OrderID:null,
      OrderNo:Math.floor(10000+Math.random()*9000000).toString(),
      CustomerID:0,
      PMethod:'',
      GTotal:0
    };
    this.service.orderItems=[];
  }

  AddOrEdithOrderItem( orderItemsIndex: any, OrderID: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    dialogConfig.data={orderItemsIndex,OrderID}
    this.dialog.open(OrderItemsComponent,dialogConfig);
  }

  onDeleteOrderItem(orderItemID:number,i:number)
  {
    this.service.orderItems.splice(i,1)
  }
}
