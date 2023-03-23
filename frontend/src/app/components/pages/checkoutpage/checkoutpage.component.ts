import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/model/order';

@Component({
  selector: 'app-checkoutpage',
  templateUrl: './checkoutpage.component.html',
  styleUrls: ['./checkoutpage.component.css']
})
export class CheckoutpageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!:FormGroup
  isSubmitted=false
  constructor(private cartService: CartService, private fromBuilder: FormBuilder,
    private userService: UserService, private toastrService: ToastrService, private router: Router,
    private orderService:OrderService) {
    
    const cart = this.cartService.getCart()
    this.order.items = cart.items
    this.order.totalPrice = cart.totalPrice
  }
  
  ngOnInit(): void {
    let { name, address } = this.userService.currentUser;

    this.checkoutForm = this.fromBuilder.group({
      name: [name, Validators.required],
      address:[address,Validators.required]
    })
  }

  get fc() {
    return this.checkoutForm.controls
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please fill the inputs','Invalid Inputs')
      return;
    }

    if (!this.order.addressLatLng) {
      this.toastrService.warning("Please select your location on the map", 'Location');
      return;
    }
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this.orderService.create(this.order).subscribe({
      next: () => {
        this.router.navigateByUrl('/payment')
      },
      error: (errorResponse) => {
        console.log(errorResponse.error)
        this.toastrService.error(errorResponse,'Cart')
      }
    })
  }

}
