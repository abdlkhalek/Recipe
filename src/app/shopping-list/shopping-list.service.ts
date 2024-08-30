import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";


import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

    // ingredientChanged: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();
    ingredientChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
    startedEditing: Subject<number> = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];


    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    getIngredient(index: number): Ingredient{
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
        // this.ingredientChanged.emit(this.ingredients.slice());
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]): void {
        // option 1 but it would have a lot of events
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }

        // option 2 
        this.ingredients.push(
            ...ingredients
        );
        // this.ingredientChanged.emit(this.ingredients.slice());
        this.ingredientChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient): void {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }


    deleteIngredient(index: number): void {
        this.ingredients.splice(index,1);
        this.ingredientChanged.next(this.ingredients.slice());
    }

}