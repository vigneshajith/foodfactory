import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/model/food';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods: Food[] = []
  constructor(private foodService: FoodService,  activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      let p = params['searchTerm'];
      if (p) {
        
        this.foods = this.foodService.getAllFoodsBySearchTerm(p)
      } else {
        console.log(p)
        this.foods = foodService.getAll()
      }
    })
  }
  ngOnInit(): void {

  }
}
