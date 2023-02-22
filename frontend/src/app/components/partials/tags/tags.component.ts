import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/model/top';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  tags!:Tag[];
  constructor(activatedRoute:ActivatedRoute,private route:Router,foods:FoodService) {
    
    this.tags = foods.getAllTags()
  }
  
 

}
