export class OmModel {
  public purchaseref: number;
  public amount:number;
  public token:string;
  public currency:string;
  public status:number;
  public clientid: string;
  public clientName: string;
  public payid: string;
  public date: string;
  public time: string;
  public ipaddr: string;
  public error: number;
  public signature: string;

  constructor(purchaseref, amount, token, currency, status, clientid, clientName, payid, date, time, ipaddr, error, signature ) {

  }
}
