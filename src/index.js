const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

// const { User } = require('./models/index');
// const bcrypt = require('bcrypt');

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server is running on port: ${PORT}`);
        // const incomingpassword = 'BoltBhai123';
        // const user = await User.findByPk(2);
        // const response = bcrypt.compareSync(incomingpassword, user.password);
        // console.log(response);
    })
}

prepareAndStartServer();