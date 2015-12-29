var Douban = require('../index.js'),
    mocha = require('mocha'),
    should = require('should'),
    fs = require('fs');

var douban = new Douban({
    
});

describe("Douban book API", function() {
    it("Douban search book", function(done) {
        douban.search({
                q: "香港基本法的成功实践",
            start: 0,
            count: 5
        }, function(err, data) {
           data.books[0].id.should.not.be.empty;
           done();
        });
    });
    it("Douban search book by ISBN", function(done) {
       douban.searchByIsbn("7301045700", function(err, data) {
           data.id.should.not.be.empty;
           done();
       });
    });
});