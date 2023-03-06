import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/model/Cart';
import { CartItem } from '../shared/model/CartsItem';
import { Food } from '../shared/model/food';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart)
  constructor() {}
  getCartObservable():Observable<Cart> {
    return this.cartSubject.asObservable()
  }
  
  addToCart(food:Food):void {
    
    let cartItem = this.cart.items.find(item => item.food.id === food.id)
    if (cartItem)
      return;
    this.cart.items.push(new CartItem(food))
    this.setCartToLocalStorage()
  }


  removeFromCart(foodId:string):void {
    this.cart.items = this.cart.items.filter(items => items.food.id != foodId)
    this.setCartToLocalStorage()

  }

  changeQuantity(foodId: string, quantity: number) {
    
    let cartItem = this.cart.items.find(item => item.food.id === foodId)
    if(!cartItem) return
    cartItem.quantity = quantity
    cartItem.price = quantity * cartItem.food.price
    this.setCartToLocalStorage()

  }

  clearCart() {
    this.cart = new Cart()
    this.setCartToLocalStorage()
  }
 

  private setCartToLocalStorage(): void{
  
    this.cart.totalCount = this.cart.items.reduce((prevCount,currentCount)=> prevCount + currentCount.quantity,0)
    this.cart.totalPrice = this.cart.items.reduce((prevPrice,currentPrice)=> prevPrice + currentPrice.price,0)
    const cartJson = JSON.stringify(this.cart)
    localStorage.setItem('Cart', cartJson);

    this.cartSubject.next(this.cart)
  }

  private getCartFromLocalStorage(): Cart{
    const cartJson = localStorage.getItem('Cart')
    return cartJson ? JSON.parse(cartJson) : new Cart(); 
  }

}
