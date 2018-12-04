var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development'; // use the env variable if configured else use development.
//dev runs on port 3300, prod runs on port 80

var config = {
    development: {
        root: rootPath,
        app: { name: 'Foos' },
        port: 3300,
        db: 'mongodb://127.0.0.1/foobar-dev'

    },

    production: {
        root: rootPath,
        app: { name: 'Foos' },
        port: 3302,
        db: 'mongodb://127.0.0.1/foobar'

    }

};

module.exports = config[env];