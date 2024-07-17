export interface IRecipe{
    _id?: string;
    recipeName:string;
    slug:string;
    recipeCalories:number;
    recipeCategory:string;
    prepTime?:number;
    cookTime?:number;
    recipeNutrition?:{
        protein:number,
        fats:number,
        carbs:number,
        sodium:number,
        fiber:number,
        sugar:number,
    },
    recipeIngredients?:Array<String>;
    recipeSteps?:Array<String>;
    dishImages?:Array<String>;
    createdAt?: Date;
    updatedAt?: Date;
}