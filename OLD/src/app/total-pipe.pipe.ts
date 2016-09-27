import { Pipe, PipeTransform } from '@angular/core';
import { OrderItem } from './order-item'

@Pipe({
  name: 'totalPipe'
})
export class TotalPipePipe implements PipeTransform {

  transform(items: Array<OrderItem>, args?: any): any {
    
    let total = 0

    // if(args == 'item'){



    // }else{

      items.forEach( (value:OrderItem, index:number, array:OrderItem[])=> {
      
        if(value.quantity > 0)
          total += value.unit_price * value.quantity

      })

    //}

    return total;

  }

}
