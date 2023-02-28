import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/model/Cart';
import { CartItem } from 'src/app/shared/model/CartsItem';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  carts!: Cart;
  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe(cart => {
      this.carts = cart
      console.log(this.carts)
    })
  }

  removeCartItem(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id)
  }

 
  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString)
    this.cartService.changeQuantity(cartItem.food.id, quantity)
  }
 
  dec(cartItem:CartItem,num:string) {
    let num1 = parseInt(num)
    if (num1 == 1) {
      this.cartService.changeQuantity(cartItem.food.id, num1)
    } else {
      num1--
      this.cartService.changeQuantity(cartItem.food.id, num1)
    }
      
  }
  inc(cartItem:CartItem,num:string) {
    let num2 = parseInt(num)
    num2++
    this.cartService.changeQuantity(cartItem.food.id,num2)
  }
}