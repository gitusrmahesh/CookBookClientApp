import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipe: Recipe={
    recipeID:0,
    recipeType:'',
    recipeName:'',
    category:0,
    ingredients:'',
    source:'',
    description:''
  };
  submitted=false;

  constructor(private recipeService: RecipeService ,
    private toastr:ToastrService ,private router:Router) {
      
     }

  ngOnInit(): void {
  }

  saveRecipe(): void{
    const data ={
      recipeId: this.recipe.recipeID,
      recipeName:this.recipe.recipeName,
      recipeType:this.recipe.recipeType,
      source:this.recipe.source,
      category:this.recipe.category,
      ingredients:this.recipe.ingredients,
      description:this.recipe.description
    };
    this.recipeService.create(data)
        .subscribe(
          response=>{
            console.log(response),
            this.toastr.success('Record Added Successfully....!');
            this.router.navigate(['']);
            this.submitted=true;

          },
          error=>{
            console.log(error);
          });
  }

  newRecipe():void{
    this.submitted=false;
    this.recipe={
      recipeID:0,
      recipeType:'',
      recipeName:'',
      category:0,
      source:'',
      ingredients:'',
      description:''
    };
  }

}
