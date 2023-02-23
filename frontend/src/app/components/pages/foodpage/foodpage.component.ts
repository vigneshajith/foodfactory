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

  food!: Food;
  constructor(activatedRoute:ActivatedRoute, foodService:FoodService) {
    activatedRoute.params.subscribe(params => {
      if (params.id !== null||undefined) {
        this.food = foodService.getFoodById(params.id)
      }
    })
  }
}
