const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try{
            const user = await this.userRepository.create(data);
            return user;
        }
        catch(error){
            console.log("something went wrong in service layer")
            throw error;
        }
    }

    createToken(user) {
        try{
            const result = jwt.sign(user, JWT_KEY,{expiresIn: '1d'});
            return result;
        }
        catch(error){
            console.log("Something went wrong in token creation ");
            throw error;
        }
    }

    verifyToken(token){
        try{
            const response = jwt.verify(token, JWT_KEY); // if it will verified then it will return you the same obj throw which it is created
            return response;
        }
        catch(error){
            console.log("Something went wrong in token validation",error);
            throw error;
        }
    }

    checkPassword(userPlainPassword, encryptedPassword){
        try{
            return bcrypt.compareSync(userPlainPassword, encryptedPassword);
        }
        catch(error){
            console.log("Something went wrong in password validation");
            throw error;
        }
    }
}

module.exports = UserService;