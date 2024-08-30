import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.servic";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor( 
        private http: HttpClient, 
        private rescipeService: RecipeService,
        private authService: AuthService
    ){}

    storeRecipes() {
        const recipes = this.rescipeService.getRecipes();
        this.http.put(// to store an array of recipes
            'https://ng-recipe-book-7f0d4-default-rtdb.firebaseio.com/recipes.json',
            recipes
        )
        .subscribe(
            response => {
                console.log(response);
            }
        ); 
    }


    fetchRecipes() {

        return this.http
            .get<Recipe[]> (
                'https://ng-recipe-book-7f0d4-default-rtdb.firebaseio.com/recipes.json'
            )
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                            return { 
                                ...recipe,
                                ingredients: recipe.ingredients ? recipe.ingredients : []
                            };
                        });
                }),
                tap(recipes => {
                    this.rescipeService.setRecipe(recipes);
                })
            );

        // return this.authService.user.pipe(
        //     take(1), // to avoid unsubscribe manually
        //     exhaustMap(user => {
        //         return this.http.get<Recipe[]>(
        //             'https://ng-recipe-book-7f0d4-default-rtdb.firebaseio.com/recipes.json',{
        //                 params: new HttpParams().set('auth', user.token)
        //             }
        //         );
        //     }),
        //     map(recipes => {
        //         return recipes.map(recipe => {
        //                 return { 
        //                     ...recipe,
        //                     ingredients: recipe.ingredients ? recipe.ingredients : []
        //                 };
        //             });
        //     }),
        //     tap(recipes => {
        //         this.rescipeService.setRecipe(recipes);
        //     })
        // );
        // return this.http.get<Recipe[]>(
        //     'https://ng-recipe-book-7f0d4-default-rtdb.firebaseio.com/recipes.json'
        // ).pipe(
        //     map(recipes => {
        //         return recipes.map(recipe => {
        //                 return { 
        //                     ...recipe,
        //                     ingredients: recipe.ingredients ? recipe.ingredients : []
        //                 };
        //             }
        //         )
        //     }
        //     ),
        //     tap(recipes => {
        //         this.rescipeService.setRecipe(recipes);
        //     })
        // )
        // .subscribe(
        //     recipes => {
        //         this.rescipeService.setRecipe(recipes);
        //     }
        // );
    }

}