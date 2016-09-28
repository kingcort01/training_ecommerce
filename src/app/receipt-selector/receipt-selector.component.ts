
import { Component, OnInit } from '@angular/core';
import { OrderService } from "../order.service"
import { Order } from "../order"
import { Observable } from "rxjs"

@Component({
  selector: 'app-receipt-selector',
  templateUrl: './receipt-selector.component.html',
  styleUrls: ['./receipt-selector.component.css']
})
export class ReceiptSelectorComponent implements OnInit {

  orders:Array<Order>
  // ob_orders:Observable<Array<Order>> // phase 3
  // promise_orders:Promise<Array<Order>>

  //inject the service instance in constructor
  constructor(private os:OrderService  ) {
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
      // os.getOrderFromURL().then( orders => this.orders )
      // this.ob_orders = os.getOrderFromURL(); //phase 3

  }

  loadFromURL(){

    this.os.loadDataFromURL().then( orders => {
      this.orders = orders;
    })
  
  }

   //init when done created a component
  ngOnInit() {

    // this.ob_orders.subscribe( data => { //phase 3
    //   this.orders = data
    // })

    // this.promise_orders.then( orders => {

    // })

    // this.onSomething()

  }


  onSomething(){

    // this.promise_orders.then( orders => {
    //   console.log("do some othe stuff")
    // })

    // this.ob_orders.map( orders => {
    //   console.log('call map')
    //   return orders[0].items[0].quantity
    // }).subscribe( data => {
    //   console.log(data)
    // })

  }



}
