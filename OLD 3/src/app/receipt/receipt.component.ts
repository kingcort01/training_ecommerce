import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../order.service'

//get data from router
import { ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  order

  constructor(private od:OrderService, private currentRoute:ActivatedRoute) {
    // this.order = od.getAllOrder()[0]
  }

  ngOnInit() {
    //get ID from router
    this.currentRoute.params.forEach( (params:Params) => {
      //now we get an ID of ther order
      console.log(params['id'])
      this.order = od.getAllOrder(params['id'])
    })
  }

}
