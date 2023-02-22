import { Injectable } from '@angular/core';
import { sample_foods } from 'src/data';
import {Food} from '../shared/model/food'

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(): Food[]{
    return sample_foods
  }
  getAllFoodBySearchTrem(searchTerm:string) {
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }
}
