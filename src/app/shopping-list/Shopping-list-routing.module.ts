import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list.component";

const routes: Routes = [
    { 
        path: '',
        component: ShoppingListComponent 
    } // /shopping-list would redirect to ShoppingListComponent
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule{}