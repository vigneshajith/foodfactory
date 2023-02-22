import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/model/food';

@Component({
  selector: 'app-foodpage',
  templateUrl: './foodpage.component.html',
  styleUrls: ['./foodpage.component.css']
})
export class FoodpageComponent {
  Item!: Food[] ;
  constructor(activatedRoute:ActivatedRoute,private foodService:FoodService) {
    activatedRoute.params.subscribe(params => {
      if (params.food) {
        this.Item = this.foodService.getFoodByFoodId(params.food)
      }
    })
  }

}
