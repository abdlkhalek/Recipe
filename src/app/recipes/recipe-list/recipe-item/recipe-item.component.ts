import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model'
// import { RecipeService } from '../../recipe.service';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent implements OnInit{
  @Input() recipe: Recipe;
  @Input() index: number;
  // @Output() recipeSelected: EventEmitter<void> = new EventEmitter<void>();

  // constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    
  }

  // onSelected(): void {
  //   // this.recipeSelected.emit();
  //   this.recipeService.getRecipeSelected().emit(this.recipe);
  // }

}
