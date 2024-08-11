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

    public async getCategory(){
        const recipeCategory = await RecipeModel.aggregate([
            {
                $group:{
                    _id: "$recipeCategory",
                    count: {$count:{}}
                }

            },
            {
                $project:{
                    _id:0,
                    categoryName:"$_id",
                    recipeCount:"$count"
                }
            },
            {
                $sort:{
                    categoryName: 1
                }
            }
        ])

        return recipeCategory;
    }

    public async getSuggest(limit:number = 1){
        const pipeline = [
            { $match: { recipeCategory: "Breakfast" } },
            { $sample: { size: limit } }, 
            { $unionWith: {
                coll: "recipes",
                pipeline: [
                    { $match: { recipeCategory: "Snack" } },
                    { $sample: { size: limit } }
                ]
            }},
            { $unionWith: {
                coll: "recipes",
                pipeline: [
                    { $match: { recipeCategory: "Salad" } },
                    { $sample: { size: limit } }
                ]
            }},
            { $unionWith: {
                coll: "recipes",
                pipeline: [
                    { $match: { recipeCategory: "Dinner" } },
                    { $sample: { size: limit } }
                ]
            }},
            {
                $project:{__v:0,createdAt:0,updatedAt:0}
            }
        ]

        const categorySuggestList:IRecipe[] = await RecipeModel.aggregate(pipeline)
        
        let orderByCategory = {
            Breakfast:[],
            Snack:[],
            Salad:[],
            Dinner:[]
        }

        for(let r of categorySuggestList){
            switch (r.recipeCategory) {
                case "Breakfast":
                    orderByCategory.Breakfast.push(r)
                    break;
                case "Snack":
                    orderByCategory.Snack.push(r)
                    break;
                case "Salad":
                    orderByCategory.Salad.push(r)
                    break;
                default:
                    orderByCategory.Dinner.push(r)
                    break;
            }
        }

        return {...orderByCategory};
    }
}



