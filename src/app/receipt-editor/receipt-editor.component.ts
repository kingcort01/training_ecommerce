import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../order'
import { OrderItem } from '../order-item'

@Component({
  selector: 'app-receipt-editor',
  templateUrl: './receipt-editor.component.html',
  styleUrls: ['./receipt-editor.component.css']
})
export class ReceiptEditorComponent implements OnInit {
  //will run when create instance of class-->1
  constructor(private os:OrderService, private route:ActivatedRoute, private router:Router) { } // get data from other files or from the imported files
  private formDate:string;  // init variable and its type
  private order:Order; // init variable and its type e.g. Order has its own data format

  //will run when create component-->2
  ngOnInit() { 
    this.route.params.forEach( (params:Params) => {
      console.log(params['id'])
      this.order = this.os.getOrder(params['id']) // get the item using the ID parameter
      this.formDate = this.order.create_time.toISOString().substring(0, 10)
      console.log(this.order)
      console.log("CHECK FORM DATAQ : ", this.formDate)
    } )
  }

  //add item in order.items
  addItem(){
    console.log("CHECK WORK")
    this.order.items.push( new OrderItem("", 1, 0) ) // push item to order items and get the format for each item to OrderItems
  }

  //delete item in order.items
  //parameter will be declare later
  deleteItem(index:number){ // what type is should be
    this.order.items.splice(index, 1)
  }

  //validate if everything correct
  //if valid return true
  //make sure data is ready
  //1. validate formDate => must not be empty
  //2. shoud have at least 1 item => items.length > 0
  //3 each item should have a name
  // if 1 && 2 && 3 ==> pass =>> true else false
  validate():boolean{
    let result = true
    if(this.formDate == "")
      return false
    
    if(this.order.items.length <= 0)
      return false

    this.order.items.forEach( OrderItem => {
      if( OrderItem.item == "")
        result = false
    })

    return result
  }

  //save data to DB
  //return true if success
  save():boolean{
    if(!this.validate())
      return false
    //we need to change formDate 
    this.order.create_time = new Date(this.formDate)
    //we need to save our order to DB(localstorage) by using orderService(os)

    //we need to implete updateOrder() to OrderService
    this.os.updateOrder(this.order)

    return true
  }

  onSave(){
    if(!this.save())
      alert('You are wrong!!!')
    else{
      alert('You have been saved!! . . . .For now!!')
      this.router.navigate(['home']);  
    }
    
    //or we could navigate back to home

  }

}
