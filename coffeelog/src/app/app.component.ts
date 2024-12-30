import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoffeeComponent } from './coffee/coffee.component';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, ListComponent, CoffeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'coffeelog';
}
