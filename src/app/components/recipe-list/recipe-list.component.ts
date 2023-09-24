import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  
  recipes?:Recipe[];
  currentRecipe: Recipe={};
  currentIndex=-1;
  recipeName='';
  categoryName='';

  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.retrieveRecipies();
  }
  
  retrieveRecipies():void{
    this.recipeService.getAll()
    .subscribe(
      data=>{
        this.recipes=data;
        console.log(data);
      },
      error=>{
        console.log(error);
      }

    );
  }

  refreshList():void{
    this.retrieveRecipies();
    this.currentRecipe={};
    this.currentIndex=-1;
  }
  setRecipeType(id:number):void{
    if(id==1)
      this.categoryName='Veg';
    else if((id==2))
    this.categoryName='Non-Veg';

  }

  setActiveRecipe(recipe:Recipe,index:number):void{
    this.currentRecipe=recipe;
    this.currentIndex=index;
     this.setRecipeType(recipe.category||0);
  }

}
