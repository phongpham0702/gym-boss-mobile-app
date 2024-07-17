import { recipesPerPage } from "@/config/page.config";
import { HttpException } from "@/exceptions/HttpException";
import { IRecipe } from "@/interfaces/recipe.interface";
import { RecipeModel } from "@/models/recipes.model";
import { Service } from "typedi";

@Service()
export class RecipeService{

    private readonly skipField:object = {
        _id:0,
        "recipeNutrition._id":0,
        __v:0,
        updatedAt:0
    }

    public async getRecipes(currPage:number = 1, category?:string){
        let filter:object = category? {"recipeCategory": category} : {}
        const findRecipes: IRecipe[] = await RecipeModel.find(filter,{
            ...this.skipField
        })
        .skip((recipesPerPage*currPage) - recipesPerPage)
        .limit(recipesPerPage)
        .lean()
        
        const totalRecipes:number = await RecipeModel.countDocuments(filter)

        return {
            totalRecipes,
            recipesPerPage,   
            totalPages: Math.ceil(totalRecipes/recipesPerPage),
            recipes: findRecipes
        };
    }

    public async getDetail(recipeSlug:string){
        const findRecipe:IRecipe = await RecipeModel.findOne({
            slug: recipeSlug
        },
        {
            ...this.skipField
        }).lean()

        return findRecipe;

    }

}