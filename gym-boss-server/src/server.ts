import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { FacilityRoute } from './routes/facility.route';
import { ExerciseRoute } from './routes/exercises.route';

ValidateEnv();

const app = new App([
    new UserRoute(), 
    new AuthRoute(),
    new FacilityRoute(),
    new ExerciseRoute()
]);

app.listen();
