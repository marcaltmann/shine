import 'hello_angular/polyfills';

import { Component, NgModule    } from '@angular/core';
import { BrowserModule          } from '@angular/platform-browser';
import { FormsModule            } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Http, HttpModule }       from '@angular/http';

const RESULTS = [
  {
    first_name: "Pat",
    last_name: "Smith",
    username: "psmith",
    email: "pat.smith@somewhere.net",
    created_at: "2016-02-05",
  },
  {
    first_name: "Patrick",
    last_name: "Jones",
    username: "pjpj",
    email: "jones.p@business.net",
    created_at: "2014-03-05",
  },
  {
    first_name: "Patricia",
    last_name: "Benjamin",
    username: "pattyb",
    email: "benjie@aol.info",
    created_at: "2016-01-02",
  },
  {
    first_name: "Patty",
    last_name: "Patrickson",
    username: "ppat",
    email: "pppp@freemail.computer",
    created_at: "2016-02-05",
  },
  {
    first_name: "Jane",
    last_name: "Patrick",
    username: "janesays",
    email: "janep@company.net",
    created_at: "2013-01-05",
  },
];


let CustomerSearchComponent = Component({
  selector: 'shine-customer-search',
  template: `
<header>
  <h1 class="h2">Customer Search</h1>
</header>

<section class="search-form">
  <form>
    <label for="keywords" class="sr-only">Keywords</label>
    <input type="text" id="keywords" name="keywords"
           placeholder="First Name, Last Name, or Email Address"
           class="form-control input-lg"
           bind-ngModel="keywords"
           on-ngModelChange="search($event)"/>
  </form>
</section>

<section class="search-results">
  <header>
    <h1 class="h3">Results</h1>
  </header>

  <ol class="list-group">
    <ng-template ngFor bind-ngForOf="customers" let-customer>
      <li class="list-group-item clearfix">
        <h3 class="pull-right">
          <small class="text-uppercase">Joined</small>
          {{customer.created_at}}
        </h3>
        <h2 class="h3">
          {{customer.first_name}} {{customer.last_name}}
          <small>{{customer.username}}</small>
        </h2>
        <h4>{{customer.email}}</h4>
      </li>
    </ng-template>
  </ol>

</section>`,
}).Class({
  constructor: [
    Http,
    function(http) {
      this.customers = null;
      this.http = http;
      this.keywords  = '';
    }
  ],
  search($event) {
    this.keywords = $event;
    if (this.keywords.length < 3) {
      return;
    }

    this.http.get(
      '/customers.json?keywords=' + this.keywords
    ).subscribe(
      (response) => {
        this.customers = response.json().customers;
      },
      (response) => {
        window.alert(response);
      }
    );
  },
});

let CustomerAppModule = NgModule({
  imports:      [BrowserModule, FormsModule, HttpModule],
  declarations: [CustomerSearchComponent],
  bootstrap:    [CustomerSearchComponent],
})
.Class({
  constructor() {
  },
});

platformBrowserDynamic().bootstrapModule(CustomerAppModule);
