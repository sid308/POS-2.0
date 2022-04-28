import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../service/inventory.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Inv } from '../../Module/Inventory';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  Inv: Inv[] | undefined;
  InvSingle: Inv[] | undefined;

  headers = [
    'ID',
    'Name',
    'Unit Price',
    'Stock (kg/mtr)',
    'Amount',
    'Actions',
    'Warehouse',
  ];
  Aname: string = '';
  Aunit: string = '';
  Astock: string = '';
  Aware: string = '';

  InventoryToUpdate = {
    name: '',
    unit: '',
    stock: '',
  };
  loading: boolean = false;
  errorMessage: any;
  closeResult: string | undefined;
  constructor(
    private InventoryService: InventoryService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getInventory();
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
  public getInventory() {
    this.loading = true;
    this.errorMessage = '';
    this.InventoryService.getInventory().subscribe(
      (response) => {
        //next() callback
        console.log('response received');
        this.Inv = response['data'];
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
  public addInventory() {
    this.loading = true;
    this.errorMessage = '';
    this.InventoryService.postUserData(this.Aname).subscribe(
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
        this.getInventory();
      }
    );
  }
  public putInventory(eid: any) {
    this.loading = true;
    this.errorMessage = '';
    this.InventoryService.putUserData(
      eid,
      this.InventoryToUpdate.name
    ).subscribe(
      (response) => {
        //next() callback
        console.log('response send');
        // console.log(
        //   eid,
        //   this.InventoryToUpdate.name,
        //   this.InventoryToUpdate.gst,
        //   this.InventoryToUpdate.email,
        //   this.InventoryToUpdate.phone,
        //   this.InventoryToUpdate.address,
        //   this.InventoryToUpdate.city,
        //   this.InventoryToUpdate.state,
        //   this.InventoryToUpdate.pin_code
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
    this.InventoryService.deleteUserData(Euid).subscribe(
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
        this.getInventory();
      }
    );
  }
  public getSingleInventory(Eid: any) {
    this.loading = true;
    this.errorMessage = '';
    this.InventoryService.getSingleInventory(Eid).subscribe(
      (response) => {
        //next() callback
        console.log('response received');
        this.InvSingle = response['data'];
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
  update(inventory: any) {
    this.InventoryToUpdate = inventory;
  }
}
