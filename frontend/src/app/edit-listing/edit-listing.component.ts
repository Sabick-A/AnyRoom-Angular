import { Component, OnInit } from '@angular/core';

import { ActivatedRoute ,Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.scss']
})
export class EditListingComponent implements OnInit {
  listing: any;

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.fetchListing(id);
    });
  }
  
  fetchListing(id: string): void {
    this.http.get<any>(`http://localhost:8080/listings/${id}`).subscribe(
      (response) => {
        console.log(response);
        this.listing = response;
      },
      (error) => {
        console.error('Error fetching listing:', error);
      }
    );
  }
}
