import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods, sample_tags } from 'src/data';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/url';
import { Food } from '../shared/model/food'
import { Tag } from '../shared/model/top';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL)
  }
  getAllFoodBySearchTrem(searchTerm: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL+searchTerm)
  }
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL)
  }
  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return tag === "All" ?
      this.getAll():
    this.http.get<Food[]>(FOODS_BY_TAG_URL + tag)
  }
  getFoodById(id: string): Observable<Food>{
    return this.http.get<Food>(FOODS_BY_ID_URL+id)
  }
}
