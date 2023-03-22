const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

// const UserService = require('./services/user-service');

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
       console.log(`server started on Port: ${PORT}`);
    // const service = new UserService();
    // const newToken = await service.createToken({id: 1, email: 'rrittik38@gmail.com',});
    // console.log("new token is ",newToken);
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJycml0dGlrMzhAZ21haWwuY29tIiwiaWF0IjoxNjc5NTE4NDcyLCJleHAiOjE2Nzk1MjIwNzJ9.OvNxJlKjLvywXePKj_VGigo4GvMF_qxuvD8LxwELBRY';
    // const response = service.verifyToken(token);
    // console.log(response);
    });
}

prepareAndStartServer();