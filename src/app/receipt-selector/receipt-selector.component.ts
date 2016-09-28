
import { Component, OnInit } from '@angular/core';
import { OrderService } from "../order.service"
import { Order } from "../order"

@Component({
  selector: 'app-receipt-selector',
  templateUrl: './receipt-selector.component.html',
  styleUrls: ['./receipt-selector.component.css']
})
export class ReceiptSelectorComponent implements OnInit {

  orders:Array<Order>

  //inject the service instance in constructor
  constructor( os:OrderService  ) {
      this.orders = os.load()
      // os.getOrderFromURL( order => { //phase 1
      //   console.log("THE ORDER DATA :: ", order)
      //   this.orders = order
      //   console.log("CHECK THIS ORDER : ", this.orders)
      // })

      // os.getOrderFromURL().then( resp => { //phase 2
      //   console.log( resp ) 
      // })

      //phase 2 v2
      os.getOrderFromURL().then( orders => this.orders )

  }

   //init when done created a component
  ngOnInit() {

  }



}
