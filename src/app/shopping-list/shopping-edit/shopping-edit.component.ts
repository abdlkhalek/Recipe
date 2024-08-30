import { 
    Component, 
    OnDestroy, 
    // ElementRef, 
    // EventEmitter, 
    OnInit,
    // Output, 
    ViewChild
  } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  
  // @ViewChild('nameInput', {static: false} ) nameInputRef: ElementRef; // angular 8
  // @ViewChild('amountInput', {static: false} ) amountInputRef: ElementRef; // angular 8
  // before using services
  // @Output() IngredientAdded: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  @ViewChild('form', { static: false }) shoppingListForm:NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;


  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }


  onSubmit(form: NgForm): void {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;

    // const newIngredient = new Ingredient(ingName,ingAmount);
    // this.IngredientAdded.emit(newIngredient);
    
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else {
      // with services 
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear(): void{ 
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
