import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import * as mapboxgl from 'mapbox-gl';

@Component({
    selector: 'app-show-listing',
    templateUrl: './show-listing.component.html',
    styleUrls: ['./show-listing.component.scss'],
})
export class ShowListingComponent implements OnInit {
    listing: any;
    map!: mapboxgl.Map;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const id = params['id'];
            this.fetchListing(id);
        });
    }

    fetchListing(id: string): void {
        this.http.get<any>(`http://localhost:8080/listings/${id}`).subscribe(
            (response) => {
                console.log(response);
                this.listing = response;

                (mapboxgl as any).accessToken =
                    'pk.eyJ1Ijoic2FiaWNrIiwiYSI6ImNsdjBhNmZpbjFpb28yam55MzN0enRyNHYifQ.L4SDgamuTdZ8p_XNeQ-Dmg';
                this.map = new mapboxgl.Map({
                    container: 'map', // container id
                    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
                    center: this.listing.geometry.coordinates, // starting position [lng, lat]
                    zoom: 9, // starting zoom
                });

                const marker = new mapboxgl.Marker({ color: 'red' })
                    .setLngLat(this.listing.geometry.coordinates)
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }).setHTML(
                            `<h6>${this.listing.location}</h6><br/><p>Exact Location will be provided after Booking</p>`
                        )
                    )
                    .addTo(this.map);
            },
            (error) => {
                console.error('Error fetching listing:', error);
            }
        );
    }
}
