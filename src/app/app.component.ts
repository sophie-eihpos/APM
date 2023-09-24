import { Component } from "@angular/core";

@Component({
  selector: 'pm-root',
  template: `
  <nav class='navbar navbar-expand navbar-light bg-light'>

    <a class='navbar-brand'>{{pageTitle}}</a>

    <!-- use router instead -->
    <!-- <pm-products></pm-products> -->

    <ul class='nav nav-pills'>      
      <!-- <li><a [routerLink]="['/welcome']">Home</a></li> -->
      <!-- <li><a [routerLink]="['/products']">Product List</a></li> -->
            
      <!-- If the array only contains the route path: -->
      <li><a class='nav-link' routerLink='/welcome'>Home</a></li>
      <li><a class='nav-link' routerLink='/products'>Product List</a></li>
    </ul>

  </nav>
  
  <div class='container'>
    <router-outlet></router-outlet>
  </div>
  `,
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle: string = 'Acme Product Management';
}
