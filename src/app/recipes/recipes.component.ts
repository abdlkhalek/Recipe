import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Recipe } from './recipe.model';
// import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  // providers: [RecipeService] // put it in app moodule so all 
  // other components share the same instance even tho when the 
  // recipe component get destroyed
})
export class RecipesComponent implements OnInit, OnDestroy{

  // selectedRecipe: Recipe; // an event

  // constructor(private recipeService: RecipeService) {}
  constructor(){}

  ngOnInit() {
    // this.recipeService.getRecipeSelected()
    // .subscribe(
    //   (recipe: Recipe) => {
    //     this.selectedRecipe = recipe;
    //   }
    // )
  }

  ngOnDestroy(): void {
    
  }

}
