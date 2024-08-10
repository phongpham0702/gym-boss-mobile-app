import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { FacilityRoute } from './routes/facility.route';
import { ExerciseRoute } from './routes/exercises.route';
import { RecipeRoute } from './routes/recipes.route';
import { TrainerRoute } from './routes/trainer.route';
import { CourseRoute } from './routes/courses.route';

ValidateEnv();

const app = new App([
    new UserRoute(), 
    new AuthRoute(),
    new FacilityRoute(),
    new ExerciseRoute(),
    new RecipeRoute(),
    new TrainerRoute(),
    new CourseRoute()
]);

app.listen();
