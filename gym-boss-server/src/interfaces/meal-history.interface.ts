import { Schema } from "mongoose";
import { IRecipe } from "./recipe.interface";

export interface IMealHistory{
    userId: Schema.Types.ObjectId,
    recipe: IRecipe | Schema.Types.ObjectId
}