import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class CheckoutpageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!:FormGroup
  
  constructor(private cartService: CartService, private fromBuilder: FormBuilder,
    private userService: UserService, private toastrService: ToastrService) {
    
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
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    console.log(this.order)
  }





}
