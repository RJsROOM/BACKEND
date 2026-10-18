import { router} from 'express';
import { registerController} from '../controllers/auth.controller.js';
import { registerValidator} from '../validators/auth.validator.js';

const authRouter= router();

/*
    @route POST /api/auth/register
    @desc Register a new user
    @access Public
    @body {username, email, password}
*/
authRouter.post("/register", registerValidator, registerController);


export default authRouter;