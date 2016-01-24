var env = process.env.NODE_ENV || "development";
var config = require('../../config/config.js')[env];
var crypto = require('crypto');
var fs = require('fs');
var async = require('async');
exports.render = function(req, res) {
    // Compute JS checksum, then render
    var hash = crypto.createHash('md5'),
        stream = fs.createReadStream('./public/dist/js/all.js');
    stream.on('data', function(data) {
        hash.update(data, 'utf8')
    });
    stream.on('end', function() {
        res.render('index', {
            env: env,
            root_url: config.root_url,
            js_md5sum: hash.digest('hex')
        });
    });
};

exports.close = function(req, res) {
    res.send('<html><body><script type="text/javascript">window.close()</script></body></html>');
};