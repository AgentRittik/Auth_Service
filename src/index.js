const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const db = require('./models/index');
const { User, Role } = require('./models/index');

// const UserService = require('./services/user-service');

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
       console.log(`server started on Port: ${PORT}`);
       if(process.env.DB_SYNC){
        db.sequelize.sync({alter:true});
       }

       const u1  = await User.findByPk(1);
       const r1  = await Role.findByPk(2);
       //u1.addRoles(r1);
       //const Response = await u1.getRoles();
       //const Response = await r1.getUsers();
       //const Response = await u1.hasRoles(1); // true
       const Response = await u1.hasRoles(3); // false
       console.log(Response);
    // const service = new UserService();
    // const newToken = await service.createToken({id: 1, email: 'rrittik38@gmail.com',});
    // console.log("new token is ",newToken);
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJycml0dGlrMzhAZ21haWwuY29tIiwiaWF0IjoxNjc5NTE4NDcyLCJleHAiOjE2Nzk1MjIwNzJ9.OvNxJlKjLvywXePKj_VGigo4GvMF_qxuvD8LxwELBRY';
    // const response = service.verifyToken(token);
    // console.log(response);
    });
}

prepareAndStartServer();