import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeResolverService } from "./recipes-resolver.service";

const routes: Routes  =[
    { 
        path: '', 
        component: RecipesComponent, 
        canActivate: [AuthGuard],
        children: [
          { path: '', component: RecipeStartComponent },
          // new must be before the id so when the route get it, it does not 
          // parse it as an id and getting an error
          { path: 'new', component: RecipeEditComponent },
          { 
            path: ':id', 
            component: RecipeDetailComponent,
            resolve: [RecipeResolverService]
          },
          { 
            path: ':id/edit', 
            component: RecipeEditComponent,
            resolve: [RecipeResolverService]
          }
      ] 
      }, // /recipes would redirect to RecipesComponent
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {}