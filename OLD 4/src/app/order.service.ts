import { Injectable } from '@angular/core';
import { Order } from "./order"
import { OrderItem } from "./order-item"



const ORDERS = [
      new Order([
        new OrderItem('TestA', 1, 100),
        new OrderItem('TestB', 1, 200),
        new OrderItem('TestC', 2, 250),
      ], new Date("2015-12-12")),
      new Order([
        new OrderItem('TestD', 1, 100),
        new OrderItem('TestE', 5, 203),
        new OrderItem('TestF', 2, 250),
      ]),
      new Order([
        new OrderItem('TestK', 1, 100),
        new OrderItem('TestI', 3, 200),
        new OrderItem('TestN', 2, 250),
      ])
      ,
      new Order([
        new OrderItem('DD', 1, 100),
        new OrderItem('EE', 1, 300),
        new OrderItem('FF', 2, 250),
      ])
    ]

const LOCAL_KEY:string = "order_key"
@Injectable()
export class OrderService {
   
  constructor() { 

    this.load()

  }
  private _orders:Array<Order>;

  //save data to localstorage
  save(){ // orders:Array<Order> ----

    console.log("saved : ", this._orders)
    localStorage[LOCAL_KEY] = JSON.stringify(this._orders)

  }

  //load orderItem data from local storage
  //if there is not data give it initial data
  load():Array<Order>{
    //when we found data
    let string_data = localStorage[LOCAL_KEY]
    let order_array;
    console.log(" THE STRING DATA : ", string_data)
    if(typeof string_data == 'undefined'){
      order_array = ORDERS //when we not found data
      //save data in localstorage
      console.log('how come not : ', this.loadData(order_array))
      this._orders = this.loadData(ORDERS)
      console.log("order array : ", this._orders)
      this.save()
    }else{
      order_array = JSON.parse(string_data)//when we found data
      this._orders = this.loadData(order_array)
    }

    return this._orders

  }

  getAllOrder(): Array<Order>{
    
    return this._orders //ORDERS;
  }

  getOrder(id:string){
    console.log('find: ' + id)
    return this.getAllOrder().find( item =>{
      
      return item.id == id;
    })
  }

  loadData(orders_json_array:Array<any>){

    let orders:Array<Order> = [];

    orders_json_array.forEach( (OrderItem, index, arr) => {
      let items:Array<OrderItem>
      OrderItem.items.forEach( (item, item_index, item_arr) => {
        items.push(new OrderItem(item.item, item.quantity, item.unit_price))
      })

      let order = new Order(items, new Date(OrderItem.create_time))
      order.id = OrderItem.id
      orders.push(order)

    })

    return orders

  }


}
