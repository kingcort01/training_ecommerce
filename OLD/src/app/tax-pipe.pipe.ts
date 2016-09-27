import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taxPipe'
})
export class TaxPipePipe implements PipeTransform {

  transform(num:number, tax?: number): any {

    // return (typeof tax == 'number') ? num * tax / 100 : num * 7 / 100 

    let def_tax;
    
    typeof(tax) == 'number' ?def_tax=tax:def_tax=7;
    return  def_tax * num / 100

  }

}
