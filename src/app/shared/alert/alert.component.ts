import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {

    @Input() message: string = null;
    // no data will be emiited so make it void just to close the alert
    @Output() close = new EventEmitter<void>();


    onClose() {
        this.close.emit();
    }


}