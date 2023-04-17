const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
    try{
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            sucess: true,
            message:'Sucessfully created a new user',
            data : response,
            err: {}
        });
    }
    catch(error){
        console.log(error);
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            sucess: false,
            err: error.explanation
        });
    }
}

const signIn = async (req, res) => {
    try{
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            sucess: true,
            data : response,
            err: {},
            message:'Sucessfully logged in'
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "something went wrong ",
            data: {},
            sucess: false,
            err: error
        });  
    }
}

const isAuthenticated = async (req, res, next) => {
    try{
        const token = req.headers['x-access-token'];
        //const isVerified = userService.verifyToken(token); // we should not do this in controller because what we get in response is {email: '', id: ''} -> maybe the email that token belong to that user now doesn,t exist and bwcause token is created for 1 day but user delete the account in that period . then we should not allow this token to work

        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            sucess: true,
            data : response,
            err: {},
            message:'User is Authenticated and token is valid'
        });
    }
    
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "something went wrong ",
            data: {},
            sucess: false,
            err: error
        });  
    }
}

const isAdmin = async (req, res) => {
    try{
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            sucess: true,
            message:'Sucessfully fetched weather user is admin or not',
            data : response,
            err: {}
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "something went wrong ",
            data: {},
            sucess: false,
            err: error
        });
    }
}


module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}