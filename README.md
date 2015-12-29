# douban-book-client
Node.js REST API client for douban book.

[![Build Status](https://travis-ci.org/WhatAKitty/douban-book-client.svg)](https://travis-ci.org/WhatAKitty/douban-book-client)


## Example
`var Douban = require(douban-book-client);`  
`var api = new Douban();`  
`api.search({`  
`q: "Node.js in Action"`  
`}, function(err, data) {`  
`// what you want to do...`  
`console.log(data);`  
`})`  
