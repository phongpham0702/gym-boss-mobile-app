import { Request, Response, NextFunction } from 'express';
import { HttpException } from "@/exceptions/HttpException";
import SuccessResponse from '@/utils/successResponse.util';
import { Container } from 'typedi';
import { RecipeService } from '@/services/recipes.service';
import { Mailer } from '@/utils/mailer.util';

export class RecipeController{
    public recipeService:RecipeService= Container.get(RecipeService);

    public getRecipes = async (req:Request ,res: Response,next: NextFunction) =>{
        try {

            const pageNum:number = parseInt(req.params.page)

            if(Number.isNaN(pageNum)) throw HttpException.BAD_REQUEST("Invalid page number")

            let category:string = null

            if(req.query.category){
                switch (req.query.category.toString().toLowerCase()) {
                    case "breakfast":
                        category = "Breakfast";
                        break;
                    case "dinner":
                        category = "Dinner";
                        break;
                    case "salad":
                        category = "Salad";
                        break;
                    case "snack":
                        category = "Snack";
                        break;
                    default:
                        break;
                }
            }
            
            const findRecipes = await this.recipeService.getRecipes(pageNum,category);
            
            if(pageNum > findRecipes.totalPages) throw HttpException.BAD_REQUEST("Page does not exist")

            SuccessResponse.OK({
              ...findRecipes
            }).send(res);

        } catch (error) {
            next(error);
        }
        
    }

    public getDetail = async (req:Request ,res: Response,next: NextFunction) => {
        try {
            
            if(!req.params.slug || req.params.slug === "") throw HttpException.BAD_REQUEST("Invalid recipe slug")
       

            const recipeDetail = await this.recipeService.getDetail(req.params.slug)

            if(!recipeDetail) throw HttpException.BAD_REQUEST("No recipe was found!")

            SuccessResponse.OK({
                recipeDetail
            }).send(res);
            
        } 
        catch (error) {
            next(error)    
        }
        
        
    }

    public getCategory = async (req:Request ,res: Response,next: NextFunction)=> {
        try {
            const mailer = new Mailer();
            console.log(typeof(mailer));
            SuccessResponse.OK({
                categoryList: await this.recipeService.getCategory()
            }).send(res)

        } catch (error) {
            next(error)
        }
    }

}   
