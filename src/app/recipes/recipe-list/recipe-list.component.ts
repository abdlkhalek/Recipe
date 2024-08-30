import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  
  // @Output() recipeWasSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  // recipes:Recipe[] = [
  //   new Recipe('A test recipe','This is simply a test', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkj7p3izZi_tgpMe3pCrjF5lncmIh7g-9oJQ&usqp=CAU'),
  //   new Recipe('Another test recipe','This is simply a test', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkj7p3izZi_tgpMe3pCrjF5lncmIh7g-9oJQ&usqp=CAU')
  // ];

  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    // we already on the recipes path cause we are on the recipes list 
    // so we could use the activated route to make it relative to the route
    // we currently on
    this.router.navigate(['new'], { relativeTo: this.route }); // we are using router to navigate to the path we want 

  }

  // onRecipeSelected(recipe: Recipe): void {
  //   this.recipeWasSelected.emit(recipe);
  // }
}
