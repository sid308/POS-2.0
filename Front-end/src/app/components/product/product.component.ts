import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Prod } from '../../Module/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  Prod: Prod[] | undefined;
  ProdSingle: Prod[] | undefined;
  headers = [
    'ID',
    'Name',
    'Unit Price',
    'HSN Code',
    'Actions',
  ];

  Aname: string = '';
  Aunit_price: string = '';
  Ahsn_code: string = '';

  loading: boolean = false;
  errorMessage: any;
  closeResult: string | undefined;
  ProductToUpdate = {
    name: '',
    unit_price: '',
    hsn_code: '',
  };

  constructor(
    private ProductService: ProductService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getProducts();
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
  public getProducts() {
    this.loading = true;
    this.errorMessage = '';
    this.ProductService.getProduct().subscribe(
      (response) => {
        //next() callback
        console.log('response received');
        this.Prod = response['data'];
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
  public addproduct() {
    this.loading = true;
    this.errorMessage = '';
    this.ProductService.postUserData(
      this.Aname,
      this.Aunit_price,
      this.Ahsn_code
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
        this.getProducts();
      }
    );
  }
  public putwarehouse(eid: any) {
    this.loading = true;
    this.errorMessage = '';
    this.ProductService.putUserData(
      eid,
      this.ProductToUpdate.name,
      this.ProductToUpdate.unit_price,
      this.ProductToUpdate.hsn_code
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
    this.ProductService.deleteUserData(Euid).subscribe(
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
        this.getProducts();
      }
    );
  }
  public getSingleproduct(Eid: any) {
    this.loading = true;
    this.errorMessage = '';
    this.ProductService.getSingleproduct(Eid).subscribe(
      (response) => {
        //next() callback
        console.log('response received');
        this.ProdSingle = response['data'];
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
  update(product: any) {
    this.ProductToUpdate = product;
  }
}
