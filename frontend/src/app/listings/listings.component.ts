import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {
  listings: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchListings();
  }

  fetchListings(): void {
    this.http.get<any>('http://localhost:8080/listings').subscribe(
      (response) => {
        console.log(response);
        this.listings = response;
      },
      (error) => {
        console.error('Error fetching listings:', error);
      }
    );
  }

}