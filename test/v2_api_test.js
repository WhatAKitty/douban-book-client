var Douban = require('../index.js'),
    mocha = require('mocha'),
    should = require('should'),
    fs = require('fs');

var douban = new Douban({
    
});

describe("Douban book API", function() {
    it("Douban search book", function(done) {
        douban.search({
            q: "3065",
            start: 0,
            count: 5
        }, function(err, data) {
           if (err) {
               console.error(err);
           } else {
               console.log(data);
           }
           done();
        });
    })
});