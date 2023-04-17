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

    async signIn(email , plainPassword){
        try{
            // step1 -> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            // step 2 -> compare incoming password with stored encrypted password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordsMatch){
                console.log("passwords do not match");
                throw {error: 'Invalid credentials'};
            }
            // step 3 -> if password matches then create a new token and send to user
            const newJWT = this.createToken({email : user.email, id: user.id});
            return newJWT;
        }
        catch(error){
            console.log("something went wrong in sign in process");
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

    async isAuthenticated(token){
        try{
            const response = this.verifyToken(token);
            if(!response){
                return {error: 'Invalid token'};
            }
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id; // why returning -> we can save this user id in incoming request
        }
        catch(error){
            console.log("Something went wrong in authentication process");
            throw error;
        }
    }

    async isAdmin(userId){
        try{
            return this.userRepository.isAdmin(userId);
        }
        catch(error){
            console.log("Something went wrong in authentication process");
            throw error;
        }
    }
}

module.exports = UserService;