import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor( cartService: CartService) {
    cartService.getCartObservable().subscribe((cart) => {
        this.cartQuantity = cart.totalCount
      })
  }
  cartQuantity = 0;
}
