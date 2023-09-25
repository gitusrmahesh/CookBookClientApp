import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

const baseUrl = 'https://cookbookm.azurewebsites.net/api/cookbook';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`${baseUrl}`);
  }

  get(id:any): Observable<Recipe>{
    return this.http.get<Recipe>(`${baseUrl}/${id}`);
  }

  create(data:any): Observable<any>{
    return this.http.post(`${baseUrl}/${'AddRecipe'}`,data);
  }

  update(id:any, data:any):Observable<any>{
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id:any):Observable<any>{
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
