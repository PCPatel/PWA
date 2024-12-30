import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Coffee } from '../logic/Coffee';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-list',
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [DataService],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  list: Coffee[] = [];

  constructor(
    private data: DataService,
    private router: Router,
    private geoLocation: GeolocationService
  ) {}

  goDetails(coffee: Coffee) {
    this.router.navigate(['/coffee', coffee._id]);
  }

  ngOnInit() {
    this.data.getList((list: Coffee[]) => {
      this.list = list;
    });
  }

  goMap(coffee: Coffee) {
    const mapURL = this.geoLocation.getMapLink(coffee.location!);
    window.open(mapURL, '_blank');
  }

  share(coffee: Coffee) {
    const text = `I had this coffee at $(coffee.place) and for me it's ${coffee.rating} star`;
    const info = {
      title: coffee.name,
      text: text,
      url: window.location.href,
    };

    if ('share' in navigator && navigator.canShare(info)) {
      navigator.share(info);
    } else {
    }
  }
}
