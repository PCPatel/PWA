import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Coffee } from '../logic/Coffee';
import { GeolocationService } from '../geolocation.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { TastingRating } from '../logic/TastingRating';
import { DataService } from '../data.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-coffee',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSliderModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [DataService],
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css'],
})
export class CoffeeComponent {
  coffee = new Coffee();
  types = ['Espresso', 'Ristretto', 'Americano', 'Cappuccino', 'Frappe'];
  tastingEnabled: boolean = false;
  formType: 'editing' | 'inserting' = 'inserting';

  constructor(
    private geolocation: GeolocationService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.dataService.get(params['id'], (response: any) => {
          this.coffee = response;
          this.formType = 'editing';
          if (this.coffee.tastingRating) {
            this.tastingEnabled = true;
          }
        });
      }
    });
  }

  acquireLocation() {
    this.geolocation.requestLocation(
      (location: GeolocationCoordinates | null) => {
        if (location) {
          this.coffee.location!.latitude = location.latitude;
          this.coffee.location!.longitude = location.longitude;
        }
      }
    );
  }

  tastingRatingChanged(checked: boolean) {
    if (checked) {
      this.coffee.tastingRating = new TastingRating();
    } else {
      this.coffee.tastingRating = null;
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  save() {
    let resultFunction = (result: boolean) => {
      if (result) {
        this.router.navigate(['/']);
      } else {
        //TODO: render nice error message
      }
    };
    if (this.formType == 'inserting') {
      let { _id, ...insertedCoffee } = this.coffee;
      this.dataService.save(insertedCoffee, resultFunction);
    } else {
      this.dataService.save(this.coffee, resultFunction);
    }
  }
}
