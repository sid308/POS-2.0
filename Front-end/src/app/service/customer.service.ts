import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerService {
  // baseURL: string = 'https://api.github.com/';
  globalURL: string = 'http://localhost:3000/customer';
  constructor(private http: HttpClient) {}
  getCustomer(): Observable<any> {
    {
      return this.http.get(this.globalURL);
    }
  }
  getSinglecustomer(Eid: any): Observable<any> {
    {
      return this.http.get(this.globalURL + '/' + Eid);
    }
  }
  //current date and time
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
  //post functions
  postUserData(
    Aname: string,
    Agst: string,
    Aemail: string,
    Aphone: string,
    Aaddress: string,
    Acity: string,
    Astate: string,
    Azip: string
  ) {
    return this.http.post(this.globalURL, {
      name: Aname,
      gst: Agst,
      email: Aemail,
      phone: Aphone,
      created_on: this.getTime(),
      created_by: '0',
      updated_on: '0',
      updated_by: '0',
      address: Aaddress,
      city: Acity,
      state: Astate,
      pin_code: Azip,
    });
  }
  putUserData(
    Ename: string,
    Egst: string,
    Eemail: string,
    Ephone: string,
    Eaddress: string,
    Ecity: string,
    Estate: string,
    Ezip: string,
    eid: any,
    aid: string
  ) {
    // console.log('services');
    // console.log(eid, Ename, Egst, Eemail, Ephone, Eaddress, Ecity, Ezip, aid);
    return this.http.put(this.globalURL + '/' + eid, {
      name: Ename,
      gst: Egst,
      email: Eemail,
      phone: Ephone,
      updated_on: this.getTime(),
      updated_by: '0',
      address: Eaddress,
      city: Ecity,
      state: Estate,
      pin_code: Ezip,
      address_id: aid,
    });
  }

  deleteUserData(userId: string) {
    //let userId = 9;
    return this.http.delete(this.globalURL + '/' + userId);
  }
}
