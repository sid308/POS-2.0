import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WarehousesService {
  globalURL: string = 'http://localhost:3000/warehouse';
  constructor(private http: HttpClient) {}
  getWarehouse(): Observable<any> {
    {
      return this.http.get(this.globalURL);
    }
  }
  getSinglewarehouse(Eid: any): Observable<any> {
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
    Aaddress: string,
    Astate: string,
    Acity: string,
    Apin_code: string,
    Aweight: string,
    Aamount: string
  ) {
    return this.http.post(this.globalURL, {
      name: Aname,
      created_on: this.getTime(),
      created_by: '0',
      updated_on: '0',
      updated_by: '0',
      address: Aaddress,
      state: Astate,
      city: Acity,
      pin_code: Apin_code,
      weight: Aweight,
      amount: Aamount,
    });
  }
  putUserData(
    eid: any,
    Ename: string,
    Eaddress: string,
    Estate: string,
    Ecity: string,
    Epin_code: string,
    aid: string,
    Eweight: string,
    Eamount: string
  ) {
    // console.log('services');
    // console.log(eid, Ename, Egst, Eemail, Ephone, Eaddress, Ecity, Ezip, aid);
    return this.http.put(this.globalURL + '/' + eid, {
      name: Ename,
      updated_on: this.getTime(),
      updated_by: '0',
      address: Eaddress,
      state: Estate,
      city: Ecity,
      pin_code: Epin_code,
      address_id: aid,
      weight: Eweight,
      amount: Eamount,
    });
  }

  deleteUserData(userId: string) {
    //let userId = 9;
    return this.http.delete(this.globalURL + '/' + userId);
  }
}
