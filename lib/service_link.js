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

var util = require('util');
var inspect = function(v){
    return util.inspect(v, false, null, false);
};


exports.get = function(route, params, body, res){
    var b = "Route: " + inspect(route) +
        " Params: " + inspect(params) +
        " Body: " + inspect(body);
    res.send(200, b);
};

exports.del = function(route, params, body, res){
    return next(new restify.NotAuthorizedError("This method is not supported by this host"));
p};

exports.put = function(route, params, body, res){
    var b = "Route: " + inspect(route) +
        " Params: " + inspect(params) +
        " Body: " + inspect(body);
    res.send(200, b);
};

exports.post = function(route, params, body, res){
    var b = "Route: " + inspect(route) +
        " Params: " + inspect(params) +
        " Body: " + inspect(body);
    res.send(200, b);
};
