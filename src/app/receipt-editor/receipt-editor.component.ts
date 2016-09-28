import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../order'

@Component({
  selector: 'app-receipt-editor',
  templateUrl: './receipt-editor.component.html',
  styleUrls: ['./receipt-editor.component.css']
})
export class ReceiptEditorComponent implements OnInit {
  //will run when create instance of class-->1
  constructor(private os:OrderService, private route:ActivatedRoute) { }

  private order:Order;

  //will run when create component-->2
  ngOnInit() {
    this.route.params.forEach( (params:Params) => {
      console.log(params['id'])
      this.order = this.os.getOrder(params['id']) // get the item using the ID parameter
      console.log(this.order)
    } )
  }

}
