import { Component } from "@angular/core";

@Component({
    selector: 'not-found',
    template: `<ng-lottie [options]="{ path: 'assets/json/not-found.json' }"></ng-lottie>
    <br><div style="font-size: larger;font-weight: 800;text-align: center;color: var(--text-secondary);">
        Page Not Fount</div>`,
    styles: ['ng-lottie{ width: 50%; display: flex; margin: 1rem auto }']
})
export class PageNotFoundComponent { }
