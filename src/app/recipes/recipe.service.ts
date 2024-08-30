import { Injectable } from "@angular/core";
// import { Subject } from "rxjs";
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    
    // private recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

    // since we use this service for other components we better use subject than eventEmitter
    // private recipeSelected: Subject<Recipe> = new Subject<Recipe>();

    recipesChanged = new Subject<Recipe[]>();
    
    // private recipes:Recipe[] = [
    //   // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkj7p3izZi_tgpMe3pCrjF5lncmIh7g-9oJQ&usqp=CAU',
    //     new Recipe(
    //         'Tasty Schnitzel',
    //         'A super tasty Schnitzel - just awesome!', 
    //         'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('Freanch Fries', 20)
    //         ]),
    //         // 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.yelp.com%2Fbiz%2Ffatburger-valencia-2&psig=AOvVaw1BWmL3ElWwXYKaAfzpKJwM&ust=1714925852064000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDiquWy9IUDFQAAAAAdAAAAABAJ',
    //     new Recipe(
    //         'Big Fat Burger',
    //         'what else you need to say?', 
    //         'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Meat', 1)
    //         ])
    //   ];

    private recipes: Recipe[] = [];


      constructor(private slService: ShoppingListService) {}

      setRecipe(recipes: Recipe[]): void {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipe(index: number): Recipe{
        return this.recipes[index]; // to get a copy of the recipe
      }

      getRecipes(): Recipe[] {
        // return a copy of the array not the 
        // array itself 
        return this.recipes.slice();
      }

      // getRecipeSelected(): Subject<Recipe> {
      //   return this.recipeSelected;
      // }

      addIngredientToShoppingList(ingredients: Ingredient[]): void {
        this.slService.addIngredients(ingredients);
      }


      addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe): void {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number): void {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }

}