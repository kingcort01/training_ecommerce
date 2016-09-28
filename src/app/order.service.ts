import { Injectable } from '@angular/core';
import { Http } from "@angular/http" //inject to constructor
import 'rxjs/add/operator/toPromise' // need to import to use toPromise()
import 'rxjs/add/operator/map' //need to import to use .map
import { Operator, Observable } from "rxjs" //import data to be able to use it in xml
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

const URL:string = "data/orders.json" //path of files(backend)

@Injectable()
export class OrderService {
   
  // private http:Http

  constructor(private http:Http) {
    //make everytime we call this service load all data to _orders 
    this.load();
    this.http = http
  }

  private _orders:Array<Order>;

  //save data to localstorage
  save(){
    localStorage[LOCAL_KEY] = JSON.stringify(this._orders)
  }

  //load orderItem data from local storage
  //if there is not data give it initial data
  load():Array<Order>{
    
    let string_data = localStorage[LOCAL_KEY];
    let order_array;
    if(typeof string_data == "undefined")
    {
      order_array = ORDERS; //when we not found data
      //save data in localstorage
      this._orders =  this.loadData(order_array)
      this.save()
    }else{
      order_array = JSON.parse(string_data);//when we found data
      this._orders = this.loadData(order_array)
    }
    return this._orders;
  }

  // getOrderFromURL(callback:Function){ //callback:Function //phase 1

  //   // this.http.get(URL) // to get data from the URL

  //   this.http.get(URL).subscribe( resp => { //phase 1
  //     console.log(resp)
  //     console.log("ORDER : ", resp.json())
  //     callback(this.loadData( resp.json() ))
  //   } )

  //   // return this.http.get(URL).toPromise() //phase 2

  // }

  // getOrderFromURL():Promise<Array<Order>>{ //phase 2

  //   return this.http.get(URL).toPromise()
  //             .then( resp => this.loadData(resp.json()) )
  //             .catch( reason => [] )

  // }

  // getOrderFromURL():Observable<Array<Order>>{ //phase 3

  //   return this.http.get(URL).map( resp => {
  //     return this.loadData(resp.json())
  //   })

  // }

  loadDataFromURL():Promise<Array<Order>>{ //phase 4

    return this.http.get(URL).toPromise().then(resp => {
      this._orders = this.loadData( resp.json() )
      this.save()
      return this._orders
    })


  }

  getAllOrder(): Array<Order>{
    
    return this._orders;
  }

  getOrder(id:string){
    console.log('find: ' + id)
    return this.getAllOrder().find( item =>{
      
      return item.id == id;
    })
  }

  //update order and save to our db
  updateOrder(order:Order){
    //find index of order in _orders
    //in case typescript is 2.x.x
    let index = this._orders.findIndex( item => {
      return item.id == order.id
    })
    console.log("NOW WHAT : ", order, " ==== ", this._orders)
    console.log("WHAT IS NOW UR INDEX : ", index)
    // let index = -1
    // for(let i=0; i < this._orders.length; i++)
    //   if(this._order[i].id == order.id){
    //     index = i
    //     break;
    //   }
    //replace _order[index] with order
    this._orders[index] = order
    //then call save() function
    this.save()

  }

  loadData(orders_json_array:Array<any>){
    let orders:Array<Order> = [];
    orders_json_array.forEach( (orderItem, index, arr)=>{
      let items:Array<OrderItem> = []
      orderItem.items.forEach( (item, item_index, item_arr)=>{
        items.push(new OrderItem(item.item, item.quantity, item.unit_price))
      })
      let order = new Order(items, new Date(orderItem.create_time))
      order.id = orderItem.id;
      orders.push(order);
    } )
    return orders;
  }
  //then tea break :) 


}
