/*
██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
*/

const express = require('express'),
    router = express.Router(),
    {
        getLogin,
        postLogin,
        postLogout,
        getSignup,
        postSignup,
        getResetPassword,
        postResetPassword,
        getNewPassword,
        postNewPassword,
        getAccountPage,
        getOrders
    } = require('../controllers/auth'),
    { body } = require('express-validator'),
    User = require('../models/user');

/*
 ██████╗ ██████╗ ███╗   ██╗███████╗████████╗ █████╗ ███╗   ██╗███████╗
██╔════╝██╔═══██╗████╗  ██║██╔════╝╚══██╔══╝██╔══██╗████╗  ██║██╔════╝
██║     ██║   ██║██╔██╗ ██║███████╗   ██║   ███████║██╔██╗ ██║███████╗
██║     ██║   ██║██║╚██╗██║╚════██║   ██║   ██╔══██║██║╚██╗██║╚════██║
╚██████╗╚██████╔╝██║ ╚████║███████║   ██║   ██║  ██║██║ ╚████║███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝
*/

const messages = {
    singup: {
        name: {
            basic: 'Please enter name that contains only text and numbers.'
        },
        email: {
            basic: 'Please enter a vaild email.',
            emailTaken: 'User with that email already exist, please choose another one.'
        },
        password: {
            length: 'Password length must be at least 8 characters.',
            syntax: 'Please enter password that contains only text and numbers.'
        },
        confirmPassword: {
            basic: 'Password has different values.'
        }
    },
    login: {
        email: {
            basic: 'User email is invalid.'
        },
        password: {
            length: 'User password too short.',
            syntax: 'User password has invaild characters.'
        }
    }
}

/*
██╗  ██╗███████╗██╗     ██████╗ ███████╗██████╗ ███████╗
██║  ██║██╔════╝██║     ██╔══██╗██╔════╝██╔══██╗██╔════╝
███████║█████╗  ██║     ██████╔╝█████╗  ██████╔╝███████╗
██╔══██║██╔══╝  ██║     ██╔═══╝ ██╔══╝  ██╔══██╗╚════██║
██║  ██║███████╗███████╗██║     ███████╗██║  ██║███████║
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝
*/

const ifUserExistReject = (value, { req }) => {

    return User.findOne({email: value})
        .then( user => {
            if(user) {
                return Promise.reject(messages.singup.email.emailTaken);
            }
        })
}

const isValuesEqual = (val) => {
    return (value, { req }) => {
        if(value !== req.body[val]) {
            return false;

        }
        return true;
    }
}

/*
██████╗  ██████╗ ██╗   ██╗████████╗███████╗███████╗
██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██╔════╝██╔════╝
██████╔╝██║   ██║██║   ██║   ██║   █████╗  ███████╗
██╔══██╗██║   ██║██║   ██║   ██║   ██╔══╝  ╚════██║
██║  ██║╚██████╔╝╚██████╔╝   ██║   ███████╗███████║
╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚══════╝                                                    
*/

router.get('/login', getLogin);

router.get('/admin/login', getLogin);

router.post('/login', 
    [
        body('email')
            .isEmail()
            .withMessage(messages.login.email.basic),
        body('password')
            .isLength({min: 8, max: 50})
            .withMessage(messages.login.password.length)
            .isAlphanumeric()
            .withMessage(messages.login.password.syntax)
    ],
    postLogin);

router.post('/logout', postLogout);

router.get('/signup', getSignup);

router.post('/signup', 
    [
        body('name', messages.singup.name.basic)
            .isAlphanumeric(),
        body('email', messages.singup.email.basic)
            .isEmail()
            .custom(ifUserExistReject)
            .normalizeEmail(),
        body('password')
            .isLength({min: 8, max: 50})
            .withMessage(messages.singup.password.length)
            .isAlphanumeric()
            .withMessage(messages.singup.password.syntax)
            .trim(),
        body('confirmPassword', messages.singup.confirmPassword.basic)
            .custom(isValuesEqual('password'))
            .trim()
    ],
    postSignup);

router.get('/reset-password', getResetPassword);

router.post('/reset-password',
    [
        body('email')
            .isEmail()
            .withMessage(messages.login.email.basic)
            .normalizeEmail(),
    ]
    ,postResetPassword);

router.get('/reset-password/:token', getNewPassword);

router.post('/new-password/', 
    [
        body('password')
            .isLength({min: 8, max: 50})
            .withMessage(messages.singup.password.length)
            .isAlphanumeric()
            .withMessage(messages.singup.password.syntax)
            .trim(),
        body('confirmPassword', messages.singup.confirmPassword.basic)
            .custom(isValuesEqual('password'))
            .trim()
    ]
    , postNewPassword);

router.get('/account', getAccountPage);

router.get('/orders', getOrders);

/*
███████╗██╗  ██╗██████╗  ██████╗ ██████╗ ████████╗███████╗
██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
█████╗   ╚███╔╝ ██████╔╝██║   ██║██████╔╝   ██║   ███████╗
██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
███████╗██╔╝ ██╗██║     ╚██████╔╝██║  ██║   ██║   ███████║
╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
*/
                                                          
module.exports = router;