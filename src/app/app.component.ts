﻿import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Authentication } from './services/authentication.service';
import { User } from './models/user';

@Component({
   selector: 'app-root',
   templateUrl: 'app.component.html',
   styleUrls: ['./app.component.css']
  })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: Authentication
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
