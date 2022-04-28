import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  globalURL: string = 'http://localhost:3000/login';
  constructor(private http: HttpClient) {}

  //post functions
  postUserData(Ausername: string, Apassword: string) {
    return this.http.post(this.globalURL, {
      username: Ausername,
      password: Apassword,
    });
  }
  saveCookie(response: any) {
    if (response.accessToken && response.accessToken != '') {
      window.document.cookie = `token=${response.accessToken}; max-age=${
        1000 * 60 * 60 * 24 * 3
      }`;
      window.location.href = '/users';
    } else {
      alert('Username or password incorrect!');
    }
  }
}
