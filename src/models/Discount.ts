export class Discount {
  constructor(public id_cart_rule:number, public id_customer:number, public date_from:string, public date_to:string, public quantity:number, public code:string,public minimum_amount:number, public reduction_percent:number, public reduction_amount:number) {

  }
}
