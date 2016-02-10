var Douban = require('../index.js'),
    mocha = require('mocha'),
    should = require('should'),
    fs = require('fs');

var douban = new Douban({
    
});

describe("Douban book API", function() {
    it("Douban search book", function(done) {
        this.timeout(5000);
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
       this.timeout(5000);
       douban.searchByIsbn("7301045700", function(err, data) {
           data.id.should.not.be.empty;
           done();
       });
    });
    it("Douban get book info", function(done) {
        this.timeout(5000);
        douban.info(5363928, function(err, data) {
            data.id.should.not.be.empty;
            done();
        });
    });
    it("Douban get book tags", function(done) {
        this.timeout(5000);
        douban.tags(5363928, function(err, data) {
           data.tags[0].name.should.not.be.empty;
           done(); 
        });
    });
});