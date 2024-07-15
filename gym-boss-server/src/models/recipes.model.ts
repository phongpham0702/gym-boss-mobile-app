import { model, Schema, Document } from 'mongoose';
import { Recipe } from '@/interfaces/recipe.interface';
const RecipeSchema: Schema = new Schema({

    dishName:{
        type:String,
        required:true
    },
    dishCalories:{
        type:Number,
        required:true
    },

    cookingTime:{
        type:{
            prep: Number,
            cooking:Number,
        },
        required:true
    },

    dishNutrition:{
        type:{  
                protein: {
                    type: String,
                    required:true
                },
                fats: {
                    type: String,
                    required:true
                },
                carbs: {
                    type: String,
                    required:true
                },
                sodium: {
                    type: String,
                    required:true
                },
                fiber: {
                    type: String,
                    required:true
                },
                sugar: {
                    type: String,
                    required:true
                },
        },
        required:true,
    },

    dishIngredients:{
        type: Array<String>,
        default:[]
    },
    cookingSteps:{
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

export const RecipeModel = model<Recipe & Document>('Recipes',RecipeSchema);
