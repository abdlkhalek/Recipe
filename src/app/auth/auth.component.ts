import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { AuthResponseData, AuthService } from "./auth.servic";
import { AlertComponent } from '../shared/alert/alert.component'
import { PlaceHolderDirective } from "../shared/placeholder/palceholder.directive";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;

    private closeSub: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        // console.log(form.value);

        if(!form.valid) {
            return;
        } // an extra step to check if the form is valid beside disaple the button of submiting

        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;


        this.isLoading = true;

        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {

            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(
            responseData => {
                console.log(responseData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage; 
                this.ShowErrorAlert(errorMessage);
                this.isLoading = false;

            }
        );
        // this.error = null;
        form.reset();
    }


    onHandleError() {
        this.error = null;
    }

    ngOnDestroy(): void {
        if(this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

    /*  showing the alert component dynamically
    **/
    private ShowErrorAlert(message:string) {
        // this is a valid ts code but invalid angular code
        // const alertCmp = new AlertComponent();
        // to do so angular give as the ability with angular component factory
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
            AlertComponent
        );

        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear(); // to clear all angular components have been rendered there in that place we trying to access

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });



    }
}