import { model, Schema, Document } from 'mongoose';
import { IRecipe } from '@/interfaces/recipe.interface';
import slug from "slug";
const RecipeSchema: Schema = new Schema({

    recipeName:{
        type:String,
        required:true
    },

    slug:{
        type:String,
        required:true,
        unique:true
    },

    recipeCalories:{
        type:Number,
        required:true
    },
    recipeCategory:{
        type:String
    },
    prepTime:{
        type:Number,
        required:true
    },
    cookTime:{
        type:Number,
        required:true
    },

    recipeNutrition:{
        type:{  
                protein: {
                    type: Number,
                    required:true
                },
                fats: {
                    type: Number,
                    required:true
                },
                carbs: {
                    type: Number,
                    required:true
                },
                sodium: {
                    type: Number,
                    required:true
                },
                fiber: {
                    type: Number,
                    required:true
                },
                sugar: {
                    type: Number,
                    required:true
                },
        },
        required:true,
    },

    recipeIngredients:{
        type: Array<String>,
        default:[]
    },
    recipeSteps:{
        type:Array<String>,
        default:[]
    },
    dishImages:{
        type:Array<String>,
        default:[]
    }

}, 
{
    timestamps: true,
});

RecipeSchema.pre("validate", function(next) {
    if (this.recipeName) {
        this.slug = slug(this.recipeName, { lower: true });
    }
    next();
})

export const RecipeModel = model<IRecipe & Document>('Recipes',RecipeSchema);
