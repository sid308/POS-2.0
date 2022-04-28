import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  globalURL: string = 'http://localhost:3000/vendor';

  constructor(private http: HttpClient) { }
  getVendor(): Observable<any> {
    {
      return this.http.get(this.globalURL);
    }
  }
  getSingleVendor(Vid: any): Observable<any> {
    {
      return this.http.get(this.globalURL + '/' + Vid);
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
    Vname: string,
    Vemail: string,
    Vphone: string,
    Vgst: string,
    Vaddress: string,
    Vcity: string,
    Vstate: string,
    Vzip: string
  )
  {
    return this.http.post(this.globalURL, {
      name: Vname,
      email: Vemail,
      phone: Vphone,
      gst: Vgst,
      created_on: this.getTime(),
      created_by: '0',
      updated_on: '0',
      updated_by: '0',
      address: Vaddress,
      city: Vcity,
      state: Vstate,
      pin_code: Vzip,
    });
  }
  putUserData(
    Xname: string,
    Xemail: string,
    Xphone: string,
    Xgst: string,
    Xaddress: string,
    Xcity: string,
    Xstate: string,
    Xzip: string,
    vid: any,
    aid: string
  )
  {
    // console.log('services');
    // console.log(eid, Ename, Egst, Eemail, Ephone, Eaddress, Ecity, Ezip, aid);
    return this.http.put(this.globalURL + '/' + vid, {
      name: Xname,
      gst: Xgst,
      email: Xemail,
      phone: Xphone,
      updated_on: this.getTime(),
      updated_by: '0',
      address: Xaddress,
      city: Xcity,
      state: Xstate,
      pin_code: Xzip,
      address_id: aid,
    });
  }
  deleteUserData(userId: string) {
    //let userId = 9;
    return this.http.delete(this.globalURL + '/' + userId);
  }
}
