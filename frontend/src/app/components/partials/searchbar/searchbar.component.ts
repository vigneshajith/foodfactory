import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  searchTerm = "";
  constructor(activatedRoute:ActivatedRoute,private route:Router) {
    activatedRoute.params.subscribe(params => {
      if ( params.searchTerm === undefined) {
        this.searchTerm = ""
      } else {
        this.searchTerm = params.searchTerm;
      }
    })
  }

  search(search:string):void {
    this.route.navigateByUrl('/search/' + search);
  }
}
