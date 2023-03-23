import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/model/order';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  order = new Order()
  constructor( OrderService:OrderService, router:Router ) {
    OrderService.getNewOrderForCurrenUser().subscribe(
      {
        next: (newOrder) => {
          this.order = newOrder
        },
        error: () => {
          router.navigateByUrl('/checkout')
        }
      }
    )
  }
   
  ngOnInit(): void {
    
  }

}
