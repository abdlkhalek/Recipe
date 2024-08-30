import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import e from "cors";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";

import { User } from './user.model';
import { environment } from "../../environments/environment";

// Api key -> AIzaSyBdESvIy42y3F_RI9x4U-MzkQUsI7wIPfU


export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // user = new Subject<User>();
    user = new BehaviorSubject<User>(null);
    token: string = null;
    tokenExpirationTimer: any;


    constructor(
        private http: HttpClient
    ) {}


    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firevaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError), 
            tap(
                responseData => {
                    this.handleAuthentication(
                        responseData.email,
                        responseData.localId,
                        responseData.idToken,
                        +responseData.expiresIn
                    )
                })
        );
    }


    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firevaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(
                responseData => {
                    this.handleAuthentication(
                        responseData.email,
                        responseData.localId,
                        responseData.idToken,
                        +responseData.expiresIn
                    )
                })
            );
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData) {
            return;
        }
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = 
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }


    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');

        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;

    }

    autoLogout(expeirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(
            () => {
                this.logout();
            }, expeirationDuration);
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ) {
        const expeirationDate = new Date(new Date().getTime() + expiresIn * 1000);
            const user = new User(
                email,
                userId,
                token, 
                expeirationDate
            );
            this.user.next(user);
            this.autoLogout(expiresIn * 1000); // ms
            localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An Unknown error Occurred!';
        console.log(errorResponse);
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }

        switch(errorResponse.error.error.message) {
            case 'EMAIL_EXISTS' : 
                errorMessage = 'This email is already used by another user';
                break;
            case 'INVALID_LOGIN_CREDENTIALS' :
                errorMessage = 'There is no user record corresponding to this identifier or The user may have been deleted';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Incorrect Password!';
                break;
        }
        return throwError(errorMessage);
    }

}