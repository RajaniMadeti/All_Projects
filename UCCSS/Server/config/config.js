var path = require('path'),    
       rootPath = path.normalize(__dirname + '/..'),    
       env = process.env.NODE_ENV || 'development'; // use the env variable if configured else use development.
//dev runs on port 5000, prod runs on port 80
var config = {  
       development: {    
                   root: rootPath,    
                   app: {      name: 'UCCSS'    },    
                   port: 5000,  
                   db: 'mongodb://127.0.0.1/helpMe-dev'

        }, 
        test: {
            root: rootPath,    
                   app: {      name: 'UCCSS'    },    
                   port: 5001,  
                   db: 'mongodb://127.0.0.1/helpMe-test'

        
        },
        production: {    
                     root: rootPath,    
                     app: {      name: 'UCCSS'    },    
                      port: 5002,  
                      db: 'mongodb://127.0.0.1/helpMe'

                    }

         };

module.exports = config[env];
