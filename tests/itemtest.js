var expect    = require("chai").expect;
//var data = require("../app.js");
var request = require('supertest');

describe('Test items', function() {
    it('Archangels Ranked', function() {
        var url = 'http://localhost:5000/';
        request(url)
        .get('/Archangel/RANKED')
        
        .end(function (err, res){
            expect(res).to.have.status(200);
            expect(err).to.not.exist;
        done();
        });


    });
})