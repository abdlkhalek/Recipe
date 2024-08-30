import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{
  // @Input() recipe: Recipe;
  recipe: Recipe;
  id: number; //  the recipe id the user would select from the menu

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // but this would work only for the first time the detailComponent get loaded
    // const id = this.route.snapshot.params['id'];
    //instead we could use the route params observable and subscribe to that
    // observable

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );// here angular would do the clean up work of work of subscription

  }

  onAddToShoppingList(): void {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }



  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});

    // the alternative way with id (complex way) but the above line of code is better
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }


  onDelete(): void {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }

}
