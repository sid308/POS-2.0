import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/service/payment.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(private PaymentService: PaymentService) {}
  paymentHandler: any = null;

  success: boolean = false;

  failure: boolean = false;
  ngOnInit(): void {
    this.invokeStripe();
  }

  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KsqSUSGfr0JsMPH6Nam525PcCLaWQptZk42gjHxGIjOSLBAVMyhQlbdwAGNrjsAen9IB7E5YlR4yUNnJLEvkR5f002wefVMoT',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentstripe(stripeToken);
      },
    });

    const paymentstripe = (stripeToken: any) => {
      this.PaymentService.makePayment(stripeToken).subscribe((data: any) => {
        console.log(data);
        if (data.data === 'success') {
          this.success = true;
        } else {
          this.failure = true;
        }
      });
    };

    paymentHandler.open({
      name: 'Payment ',
      description: 'Safe and Secure',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KsqSUSGfr0JsMPH6Nam525PcCLaWQptZk42gjHxGIjOSLBAVMyhQlbdwAGNrjsAen9IB7E5YlR4yUNnJLEvkR5f002wefVMoT',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }
}
