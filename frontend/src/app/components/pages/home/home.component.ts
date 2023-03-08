import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/model/food';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods:Food[] = []
  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    let foodsObservable: Observable<Food[]>;
    activatedRoute.params.subscribe(params => {
      if (params.searchTerm) {
        foodsObservable = this.foodService.getAllFoodBySearchTrem(params.searchTerm)
      } else if  (params.tag) {
        foodsObservable = this.foodService.getAllFoodsByTag(params.tag)
      }
      else {
        foodsObservable = this.foodService.getAll()
      }
      foodsObservable.subscribe((servedFoods) => {
        console.log(servedFoods)
       return this.foods = servedFoods
      })
    })
   }
  ngOnInit(): void {
    
  }
}
