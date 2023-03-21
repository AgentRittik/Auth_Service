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
        return res.status(500).json({
            message: "something went wrong in controller layer",
            data: {},
            sucess: false,
            err: error
        });
    }
}

module.exports = {
    create
}