import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  currentRecipe:Recipe={
    recipeName:'',
    recipeType:'',
    source:'',
    category:0,
    ingredients:'',
    description:'',
  };
  message='';
  id='';

  constructor(
    private recipeService:RecipeService,
    private route:ActivatedRoute,
    private router:Router,
    private toastr:ToastrService ) { }

  ngOnInit(): void {
    this.message='';
    this.id = JSON.parse(this.route.snapshot.paramMap.get('id') || '{}');
    this.getRecipe(this.id);
  }

  getRecipe(id:string):void{
    this.recipeService.get(id)
    .subscribe(
      data=>{
        this.currentRecipe=data;
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )};

   updateRecipe():void{
    this.message='';

    this.recipeService.update(this.currentRecipe.recipeID,this.currentRecipe)
    .subscribe(
      respose=>{
        console.log(respose);
        this.router.navigate(['']);
        this.toastr.info('Record Updated Successfully....!');
        this.message=respose.message?respose.message:"This tutorial was updated successfully!";

      },
      error=>{
        console.log(error);
      }
    )}; 

    deleteRecipe():void{
      this.recipeService.delete(this.currentRecipe.recipeID)
      .subscribe(
        response=>{
          console.log(response);
          this.toastr.error('Record deleted Successfully....!');
          this.router.navigate(['']);
        },
        error=>{
          console.log(error);
        }
      )};
}
