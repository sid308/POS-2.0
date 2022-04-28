import { Component, OnInit } from '@angular/core';
import { WarehousesService } from '../../service/warehouses.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Ware } from '../../Module/Warehouses';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css'],
})
export class WarehousesComponent implements OnInit {
  Ware: Ware[] | undefined;
  WareSingle: Ware[] | undefined;
  headers = [
    'ID',
    'Name',
    'Address',
    'State',
    'City',
    'Pincode',
    'Weight(in KG)',
    'Amount',
    'Actions',
  ];

  Aname: string = '';
  Aaddress: string = '';
  Astate: string = '';
  Acity: string = '';
  Apin_code: string = '';
  Aweight: string = '';
  Aamount: string = '';

  loading: boolean = false;
  errorMessage: any;
  closeResult: string | undefined;
  WarehouseToUpdate = {
    name: '',
    address: '',
    state: '',
    city: '',
    pin_code: '',
    address_id: '',
    weight: '',
    amount: '',
  };

  constructor(
    private WarehouseServices: WarehousesService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getWarehouses();
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
  public getWarehouses() {
    this.loading = true;
    this.errorMessage = '';
    this.WarehouseServices.getWarehouse().subscribe(
      (response) => {
        //next() callback
        console.log('response received');
        this.Ware = response['data'];
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
  public addwarehouse() {
    this.loading = true;
    this.errorMessage = '';
    this.WarehouseServices.postUserData(
      this.Aname,
      this.Aaddress,
      this.Astate,
      this.Acity,
      this.Apin_code,
      this.Aweight,
      this.Aamount
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
        this.getWarehouses();
      }
    );
  }
  public putwarehouse(eid: any) {
    this.loading = true;
    this.errorMessage = '';
    this.WarehouseServices.putUserData(
      eid,
      this.WarehouseToUpdate.name,
      this.WarehouseToUpdate.address,
      this.WarehouseToUpdate.state,
      this.WarehouseToUpdate.city,
      this.WarehouseToUpdate.pin_code,
      this.WarehouseToUpdate.address_id,
      this.WarehouseToUpdate.weight,
      this.WarehouseToUpdate.amount
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
    this.WarehouseServices.deleteUserData(Euid).subscribe(
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
        this.getWarehouses();
      }
    );
  }
  public getSinglewarehouse(Eid: any) {
    this.loading = true;
    this.errorMessage = '';
    this.WarehouseServices.getSinglewarehouse(Eid).subscribe(
      (response) => {
        //next() callback
        console.log('response received');
        this.WareSingle = response['data'];
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
  update(warehouse: any) {
    this.WarehouseToUpdate = warehouse;
  }
}
