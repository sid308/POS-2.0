import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  globalURL: string = 'http://localhost:3000/order';
  constructor(private http: HttpClient) {}
  getOrder(): Observable<any> {
    {
      return this.http.get(this.globalURL);
    }
  }
  getSingleOrder(Eid: any): Observable<any> {
    {
      return this.http.get(this.globalURL + '/' + Eid);
    }
  }
  getTime() {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ('0' + date_ob.getDate()).slice(-2);

    // current month
    let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return (
      year +
      '-' +
      month +
      '-' +
      date +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds
    );
  }
  //post function
  postUserData(
    Aamount: string,
    Aorder_date: string,
    Abilling_address: string,
    Ashipping_address: string,
    Apayment_status: string,
    Aamount_paid: string,
    Amode_of_payment: string,
    Acustomer_id: string,
    Anote: string
  ) {
    return this.http.post(this.globalURL, {
      amount: Aamount,
      order_date: Aorder_date,
      created_on: this.getTime(),
      created_by: '0',
      updated_on: '0',
      updated_by: '0',
      billing_address: Abilling_address,
      shipping_address: Ashipping_address,
      payment_status: Apayment_status,
      amount_paid: Aamount_paid,
      mode_of_payment: Amode_of_payment,
      customer_id: Acustomer_id,
      note: Anote,
    });
  }
  putUserData(
    eid: any,
    Xamount: string,
    Xorder_date: string,
    Xbilling_address: string,
    Xshipping_address: string,
    Xpayment_status: string,
    Xamount_paid: string,
    Xmode_of_payment: string,
    Xcustomer_id: string,
    Xnote: string
  ) {
    // console.log('services');
    // console.log(eid, Ename,   Eaddress, Ecity, Ezip, aid);
    return this.http.put(this.globalURL + '/' + eid, {
      amount: Xamount,
      order_date: Xorder_date,
      billing_address_id: Xbilling_address,
      shipping_address_id: Xshipping_address,
      payment_status: Xpayment_status,
      amount_paid: Xamount_paid,
      mode_of_payment: Xmode_of_payment,
      customer_id: Xcustomer_id,
      note: Xnote,
      updated_on: this.getTime(),
      updated_by: '0',
    });
  }

  deleteUserData(userId: string) {
    //let userId = 9;
    return this.http.delete(this.globalURL + '/' + userId);
  }
}
