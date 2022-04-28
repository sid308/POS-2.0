import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private LoginService: LoginService) {}

  loading: boolean = false;
  errorMessage: any;
  closeResult: string | undefined;
  message: any | '';
  ngOnInit(): void {}
  username: string = '';
  password: string = '';

  public login() {
    this.loading = true;
    this.errorMessage = '';
    this.LoginService.postUserData(this.username, this.password).subscribe(
      (response) => {
        //next() callback
        console.log('response send');
        // console.log(response);
        this.LoginService.saveCookie(response);
        // if (response.message == '') {
        // }
        //this.user = response['data'];
      },
      (error) => {
        //error() callback
        console.error('Request failed with error');
        this.errorMessage = error;
        this.loading = false;
      },
      () => {
        //complete() callback
        console.log('Request completed'); //This is actually not needed
        this.loading = false;
      }
    );
  }
}
