var path = require('path'),    
       rootPath = path.normalize(__dirname + '/..'),    
       env = process.env.NODE_ENV || 'development'; // use the env variable if configured else use development.
//dev runs on port 5000, prod runs on port 80
var config = {  
       development: {    
                   root: rootPath,    
                   app: {      name: 'Todo'    },    
                   port: 3300,  
                   db: 'mongodb://127.0.0.1/helpMe-dev'

        }
         };

module.exports = config[env];