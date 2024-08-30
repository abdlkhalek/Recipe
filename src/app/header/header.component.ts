import { 
    Component,
    OnDestroy,
    OnInit, 
    // Output, 
    // EventEmitter
 } from '@angular/core';

 import { Subscription } from 'rxjs';
 import { Router } from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.servic';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    // @Output() featureSelected: EventEmitter<string> = new EventEmitter<string>();

    private userSub: Subscription;
    isAuthenticated = false;

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            // this.isAuthenticated = !user ? false : true;
            // or using shortcut they are the same
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        });
    }

    // onSelect(feature: string) {
    //     this.featureSelected.emit(feature);
    // }

    onSaveData():void {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        // this.isAuthenticated = !this.isAuthenticated
        this.authService.logout();
        this.router.navigate(['/auth']);
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}