import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();
    private changeAfterNav = false;

    constructor(private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.changeAfterNav) {
                    this.changeAfterNav = false;
                } else {
                    this.subject.next();
                }
            }
        });
    }
    success(message: string, changeAfterNav = false) {
        this.changeAfterNav = changeAfterNav;
        this.subject.next({ type: 'success', text: message });
    }
    error(message: string, changeAfterNav = false) {
        this.changeAfterNav = changeAfterNav;
        this.subject.next({ type: 'error', text: message });
    }
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
