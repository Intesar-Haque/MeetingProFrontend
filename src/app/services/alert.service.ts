import {Injectable} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private spinner: NgxSpinnerService) {
    }


    closeAlert() {
        this.spinner.hide('ui-loader')
    }

    loading(name = 'ui-loader') {
        this.spinner.show(name, {fullScreen: true, zIndex: 9999})
    }

    showError() {

    }
}
