import { body, ValidationResult}  from 'express-validator';



export function Validate(req,res,next){
    const errors= ValidationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}


export const registerValidator= [
    body("username")
        .trim()
        .notEmpty().withMessage("username is required")
        .isLength({min:3, max:30}).wothMessage("username must be between 3 and 30 characters")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("username can only contain letters, numbers, and underscores"),

    body("email")
        .trim()
        .notEmpty().withMessage("email is required")
        .isEmail().withMessage("email is not valid"),

    body("password")
        .trim()
        .notEmpty().withMessage("password is required")
        .isLength({min:6}).withMessage("password must be at least 6 characters long"),

    Validate
];

