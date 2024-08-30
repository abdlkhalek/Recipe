import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  // here with the empty path we should add the pathMatch to make sure that the full path is empty coz empty path is a part of every path
  { 
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  }, // once the app loaded redirect to recipes
  { // implementing lazy loading approach
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{ preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule] // after that we need to add AppRoutingModule to the imports array in the app.module file
})
export class AppRoutingModule {}
