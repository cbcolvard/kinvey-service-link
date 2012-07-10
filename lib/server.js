// Copyright 2012 Kinvey, Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use strict";

var configTools = require('./config');
var util = require('util');
var ServiceLink = require('./service_link');
var restify = require('restify');    // REST library we're using'

var server = restify.createServer(); // REST Server
var config = configTools.loadConfiguration();

// Configure the server to parse the request body into req.body
server.use(restify.bodyParser({ mapParams: false }));

// initialize the api handlers with the global configuration
// var api = {
//   suppliers: require('./serializers/suppliers.js') (apiConfig)
// }

// insert into call chain when debugging
var debug = function(req, res, next) {
  console.log(util.inspect(req));
  return next();
}

// Verify key matches the header
var keyauth = function(req,res,next) {
  var key = req.headers['x-auth-key'];
  if (key != config.key) {
      return next(new restify.InvalidCredentialsError("Invalid API Key"));
  } else {
    next();
  }
}


// Router functions

var extractReq = function(req, next){
    var params = req.params;
    var query = req.query;
    var body = req.body;
    var output = {query: null, params: null, body: null, route: null};

    // Extract query
    if (query && query !== undefined){
        try {
            output["query"] = JSON.parse(query);
        } catch (e){
            return new restify.InvalidContentError("JSON query exception: " + e);
        }
    }

    // Extract route
    if (params && params !== undefined){
        try {
            var s = "";
            s = params.collection;
            if (params.id){
                s = s + "/" + params.id;
            }
            output["route"] = s;
        } catch (e){
            return new restify.InvalidContentError("Invalid Params: " + e);
        }
    }

    // Extract body
    if (body && body !== undefined){
        try {
            output["body"] = JSON.parse(body);
        } catch (e){
            return new restify.InvalidContentError("JSON body exception: " + e);
        }
    }

    return output;
};

var preGet  = function(req, res, next){
    var data = extractReq(req, next);
    if (data instanceof Error){
        return next(data);
    }
    ServiceLink.get(data["route"], data["query"], data["body"], res);
};

var preDel  = function(req, res, next){
    var data = extractReq(req, next);
    if (data instanceof Error){
        return next(data);
    }
    ServiceLink.del(data["route"], data["query"], data["body"], res);
};

var prePut  = function(req, res, next){
    var data = extractReq(req, next);
    if (data instanceof Error){
        return next(data);
    }
    ServiceLink.put(data["route"], data["query"], data["body"], res);
};

var prePost = function(req, res, next){
    var data = extractReq(req, next);
    if (data instanceof Error){
        return next(data);
    }
    ServiceLink.post(data["route"], data["query"], data["body"], res);
};

// Internal router (production)
if (!config.debug){
    server.get('/:collection/:id', keyauth, preGet);
    server.del('/:collection/:id', keyauth, preDel);
    server.put('/:collection/:id', keyauth, prePut);
    server.post('/:collection/:id', keyauth, prePost);
    server.get('/:collection', keyauth, preGet);
    server.del('/:collection', keyauth, preDel);
    server.put('/:collection', keyauth, prePut);
    server.post('/:collection', keyauth, prePost);
} else {
    // For debugging we add in the debug middleware
    server.get('/:collection/:id?', keyauth, debug, preGet);
    server.del('/:collection/:id?', keyauth, debug, preDel);
    server.put('/:collection/:id?', keyauth, debug, prePut);
    server.post('/:collection/:id?', keyauth, debug, prePost);
    server.get('/:collection', keyauth, debug, preGet);
    server.del('/:collection', keyauth, debug, preDel);
    server.put('/:collection', keyauth, debug, prePut);
    server.post('/:collection', keyauth, debug, prePost);

}


// Start Server
server.listen(config.server.port, function() {
    console.log('Kinvey Service Link Started: %s listening at %s',
                server.name,
                server.url);
});
