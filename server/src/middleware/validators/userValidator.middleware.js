const { body } = require('express-validator');


exports.createUserSchema = [
    body('first_name')
        .exists()
        .withMessage('First name is required')
        .bail()
        .isAlpha()
        .withMessage('First name must be only alphabetical chars')
        .bail()
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 chars long')
        .bail(),
    body('last_name')
        .exists()
        .withMessage('Last name is required')
        .bail()
        .isAlpha()
        .withMessage('Last name must be only alphabetical chars')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Last name must be at least 3 chars long')
        .bail(),
    body('email_id')
        .exists()
        .withMessage('Email Address is required')
        .bail()
        .isEmail()
        .withMessage('Please enter valid email address')
        // .normalizeEmail()    comment by remove the dot allow the user into login -05-05-2023
        .bail(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .bail()
        .isLength({ min: 7 })
        .withMessage('Password must contain at least 8 characters')
        .bail()
        .isLength({ max: 10 })
        .withMessage('Password can contain max 25 characters')
        .bail(),
    body('confirm_password')
         .exists()
        .withMessage('Confirm password is required')
        .bail()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Confirm password must have the same value as the password')
        .bail()
];

exports.updateUserSchema = [
    body('username')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('first_name')
        .optional()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('last_name')
        .optional()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('email')
        .optional()
        .isEmail()
        // .normalizeEmail()    comment by remove the dot allow the user into login -05-05-2023
        .withMessage('Please enter valid email address'),
    body('password')
        .optional()
        .notEmpty()
        .isLength({ min: 7 })
        .withMessage('Password must contain at least 8 characters')
        .isLength({ max: 15 })
        .withMessage('Password can contain max 15 characters')
        .custom((value, { req }) => !!req.body.confirm_password)
        .withMessage('Please confirm your password'),
    body('confirm_password')
        .optional()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('confirm_password field must have the same value as the password field'),
    body('age')
        .optional()
        .isNumeric()
        .withMessage('Must be a number'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['username', 'password', 'confirm_password', 'email',  'first_name', 'last_name', 'age'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.validateLogin = [
    body('email_id')
        .exists()
        .withMessage('Email Id is required')
        .bail()
        .isEmail()
        .withMessage('Please enter valid email address')
        // .normalizeEmail()   comment by remove the dot allow the user into login -05-05-2023
        .bail(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .bail()
        .notEmpty()
        .withMessage('Password must be filled')
        .bail()
];

exports.validateForgetPassword = [
    body('email_id')
        .exists()
        .withMessage('Email Id is required')
        .bail()
        .isEmail()
        .withMessage('Please enter valid email address')
        // .normalizeEmail()    comment by remove the dot allow the user into login -05-05-2023
        .bail()
];

exports.validateForgetPasswordToken = [
    body('password_token')
        .exists()
        .withMessage('Password token is required')
        .bail()
        .notEmpty()
        .withMessage('Password token is required')
        .bail()
];

exports.validatePasswordReset = [
    body('password_token')
        .exists()
        .withMessage('Password token is required')
        .bail()
        .notEmpty()
        .withMessage('Password token is required')
        .bail(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .bail()
        .isLength({ min: 7 })
        .withMessage('Password must contain at least 8 characters')
        .bail()
        .isLength({ max: 25 })
        .withMessage('Password can contain max 25 characters')
        .bail(),
];

exports.validateOldPasswordReset = [
  body('password')
      .exists()
      .withMessage('Password is required')
      .bail()
      .isLength({ min: 8 })
      .withMessage('Password must contain at least 8 characters')
      .bail()
      .isLength({ max: 16 })
      .withMessage('Password can contain max 16 characters')
      .bail(),
];
