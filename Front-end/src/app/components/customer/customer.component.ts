import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Cust } from '../../Module/Customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  Cust: Cust[] | undefined;
  CustSingle: Cust[] | undefined;
  headers = ['ID', 'Name', 'GST', 'Email', 'Phone Number', 'Address', 'City', 'State', 'Pincode', 'Actions'];

  Aname: string = '';
  Agst: string = '';
  Aemail: string = '';
  Aphone: string = '';
  Aaddress: string = '';
  Acity: string = '';
  Astate: string = '';
  Apin_code: string = '';

  loading: boolean = false;
  errorMessage: any;
  closeResult: string | undefined;
  CustomerToUpdate = {
    name: '',
    gst: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pin_code: '',
    address_id: '',
  };
  constructor(
    private CustomerService: CustomerService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  public getCustomers() {
    this.loading = true;
    this.errorMessage = '';
    this.CustomerService.getCustomer().subscribe(
      (response) => {
        //next() callback
        console.log('response received');
        this.Cust = response['data'];
      },
      (error) => {
        //error() callback
        console.error('Request failed with error');
        this.errorMessage = error;
        this.loading = false;
      },
      () => {
        //complete() callback
        console.error('Request completed'); //This is actually not needed
        this.loading = false;
      }
    );
  }
  public addcustomer() {
    this.loading = true;
    this.errorMessage = '';
    this.CustomerService.postUserData(
      this.Aname,
      this.Agst,
      this.Aemail,
      this.Aphone,
      this.Aaddress,
      this.Acity,
      this.Astate,
      this.Apin_code
    ).subscribe(
      (response) => {
        //next() callback
        console.log('response send');
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
        this.getCustomers();
      }
    );
  }
  public putcustomer(eid: any) {
    this.loading = true;
    this.errorMessage = '';
    this.CustomerService.putUserData(
      eid,
      this.CustomerToUpdate.name,
      this.CustomerToUpdate.gst,
      this.CustomerToUpdate.email,
      this.CustomerToUpdate.phone,
      this.CustomerToUpdate.address,
      this.CustomerToUpdate.city,
      this.CustomerToUpdate.state,
      this.CustomerToUpdate.pin_code,
      this.CustomerToUpdate.address_id
    ).subscribe(
      (response) => {
        //next() callback
        console.log('response send');
        // console.log(
        //   eid,
        //   this.CustomerToUpdate.name,
        //   this.CustomerToUpdate.gst,
        //   this.CustomerToUpdate.email,
        //   this.CustomerToUpdate.phone,
        //   this.CustomerToUpdate.address,
        //   this.CustomerToUpdate.city,
        //   this.CustomerToUpdate.state,
        //   this.CustomerToUpdate.pin_code
        // );
        // this.user = response['data'];
      },
      (error) => {
        //error() callback
        console.error('Request failed with error');
        console.log(eid);
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
  public deleteUser(Euid: any) {
    this.loading = true;
    this.errorMessage = '';
    this.CustomerService.deleteUserData(Euid).subscribe(
      (response) => {
        //next() callback
        console.log('response send');
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
        //this.loading = false;
        this.getCustomers();
      }
    );
  }
  public getSinglecustomer(Eid: any) {
    this.loading = true;
    this.errorMessage = '';
    this.CustomerService.getSinglecustomer(Eid).subscribe(
      (response) => {
        //next() callback
        console.log('response received');
        this.CustSingle = response['data'];
        console.log(response);
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
  update(customer: any) {
    this.CustomerToUpdate = customer;
  }
}
