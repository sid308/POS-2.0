import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  test: any;

  ngOnInit(): void {
    // this.route.paramMap.pipe(
    //   switchMap(params => {
    //     this.selectedId = Number(params.get('id'));
    //     return this.service.getHeroes();
    //   })
    // );
    this.route.paramMap.subscribe((params) => {
      this.test = params.get('id');
      if (params.get('id')) {
        console.log('param exists');
      } else {
        console.log('param does not exist');
      }
    });
  }
}
