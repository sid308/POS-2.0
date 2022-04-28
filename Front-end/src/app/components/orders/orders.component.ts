import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Ord } from 'src/app/Module/Order';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  Ord: Ord[] | undefined;
  OrdSingle: Ord[] | undefined;

  headers = [
    'ID',
    'Amount',
    'Date',
    'Billing Address',
    'Shipping Address',
    'Payment Status',
    'Amount Paid',
    'Mode of Payment',
    'Customer ID',
    'Note',
    'Actions',
  ];

  Aamount: string = '';
  Aorder_date: string = '';
  Abilling_address: string = '';
  Ashipping_address: string = '';
  Apayment_status: string = '';
  Aamount_paid: string = '';
  Amode_of_payment: string = '';
  Acustomer_id: string = '';
  Anote: string = '';

  loading: boolean = false;
  errorMessage: any;
  closeResult: string | undefined;
  OrderToUpdate = {
    amount: '',
    order_date: '',
    billing_address: '',
    shipping_address: '',
    payment_status: '',
    amount_paid: '',
    mode_of_payment: '',
    customer_id: '',
    note: '',
  };
  customers: any[] = [];

  constructor(
    private OrderService: OrderService,
    private modalService: NgbModal,
    private _customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getOrders();
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
  public getOrders() {
    this.loading = true;
    this.errorMessage = '';
    this.OrderService.getOrder().subscribe(
      (response) => {
        //next() callback
        console.log('response received');
        this.Ord = response['data'];
        console.log(this.Ord);
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
  public addorder() {
    this.loading = true;
    this.errorMessage = '';
    this.OrderService.postUserData(
      this.Aamount,
      this.Aorder_date,
      this.Abilling_address,
      this.Ashipping_address,
      this.Apayment_status,
      this.Aamount_paid,
      this.Amode_of_payment,
      this.Acustomer_id,
      this.Anote
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
        this.getOrders();
      }
    );
  }
  public getCustomers() {
    this.loading = true;
    this.errorMessage = '';
    this._customerService.getCustomer().subscribe(
      (response) => {
        //next() callback
        console.log('response received');
        this.customers = response['data'];
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
  public putorder(eid: any) {
    this.loading = true;
    this.errorMessage = '';
    this.OrderService.putUserData(
      eid,
      this.OrderToUpdate.amount,
      this.OrderToUpdate.order_date,
      this.OrderToUpdate.billing_address,
      this.OrderToUpdate.shipping_address,
      this.OrderToUpdate.payment_status,
      this.OrderToUpdate.amount_paid,
      this.OrderToUpdate.mode_of_payment,
      this.OrderToUpdate.customer_id,
      this.OrderToUpdate.note
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
    this.OrderService.deleteUserData(Euid).subscribe(
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
        this.getOrders();
      }
    );
  }
  public getSingleorder(Eid: any) {
    this.loading = true;
    this.errorMessage = '';
    this.OrderService.getSingleOrder(Eid).subscribe(
      (response) => {
        //next() callback
        console.log('response received');
        this.OrdSingle = response['data'];
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
  update(order: any) {
    this.OrderToUpdate = order;
  }
}
