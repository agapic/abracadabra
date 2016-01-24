var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {
    development: {
    	root: rootPath,
        root_url: 'http://localhost:3000',
        app: {
            name: 'Abracadabra - Dev'
        }
    },
    production: {
    	root: rootPath,
        root_url: 'https://abra.agapic.xyz',
        app: {
            name: 'Abracadabra'
        }
    }
}