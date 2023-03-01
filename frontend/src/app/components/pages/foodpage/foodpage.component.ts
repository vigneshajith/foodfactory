import { Component } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/model/food';

@Component({
  selector: 'app-foodpage',
  templateUrl: './foodpage.component.html',
  styleUrls: ['./foodpage.component.css']
})
  
export class FoodpageComponent {

  food!: Food;
  constructor(private activatedRoute: ActivatedRoute,private router:Router,private foodService: FoodService, private cartService: CartService) {
    this.activatedRoute.params.subscribe(params => {
      if (params.id !== null||undefined) {
        foodService.getFoodById(params.id).subscribe((serverFood)=> this.food = serverFood)
      }
    })
    
  }
  addToCart() {
    this.cartService.addToCart(this.food)
    this.router.navigateByUrl('/cart-page')
  }
}
