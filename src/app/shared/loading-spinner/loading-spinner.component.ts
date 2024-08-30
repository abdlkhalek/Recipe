import { Component } from "@angular/core";


@Component({
    selector: 'app-loading-spinner',
    template: '<div class="lds-ring" bis_skin_checked="1"><div bis_skin_checked="1"></div><div bis_skin_checked="1"></div><div bis_skin_checked="1"></div><div bis_skin_checked="1"></div></div>',
    styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
    
}