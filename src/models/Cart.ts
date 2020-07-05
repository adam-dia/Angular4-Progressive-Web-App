export class Cart {
  public id_cart: number;
  public id_shop_group: number;
  public id_shop: number;
  public id_carrier: number;
  public delivery_option: string;
  public id_lang: number;
  public id_address_delivery: number;
  public id_address_invoice: number;
  public id_currency: number;
  public id_customer: number;
  public id_guest: number;
  public secure_key: string;
  public recyclable: number;
  public gift: number;
  public gift_message: number;
  public mobile_theme: string;
  public allow_seperated_package: string;
  public date_add: string;
  public date_upd: string;

  constructor(id_cart, id_shop_group, id_shop, id_carrier, delivery_option, id_lang, id_address_delivery, id_address_invoice, id_currency, id_customer, id_guest, secure_key, recyclable, gift, gift_message, mobile_theme, allow_seperated_package, date_add, date_upd) {

  }
}
