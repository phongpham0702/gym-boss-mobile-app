export interface Recipe{
    _id?: string;
    dishName?:string;
    dishCalories?:number;
    cookingTime?:{
        prep:number,
        cooking:number
    };
    dishNutrition?:{
        protein: string,
        fats: string,
        carbs: string,
        sodium: string,
        fiber: string,
        sugar: string,
    },
    dishIngredients?:Array<String>,
    cookingSteps?:Array<String>,
    dishImages?:Array<String>,
    createdAt?: Date;
    updatedAt?: Date
}