import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Cart } from 'src/app/shared/model/Cart';
import { Order } from 'src/app/shared/model/order';

@Component({
  selector: 'app-checkoutpage',
  templateUrl: './checkoutpage.component.html',
  styleUrls: ['./checkoutpage.component.css']
})
export class CheckoutpageComponent {
  order: Order = new Order();
  checkoutForm!:FormGroup
  cart!:Cart
  constructor(
    private cartService: CartService,
    private fromBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    // this.cartService.getcart()
  }
  
}
