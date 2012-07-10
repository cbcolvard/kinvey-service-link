kinvey-service-link
===================

Sample implementation of an app conforming to the Kinvey ServiceLink API.


To configure the sample app, edit the config.json file in the root
directory.  Available options are:

* _comments -- Any coments on the configuration, not used
* debug -- Turn on debugging information
* server.port -- The port to the server will listen on
* server.address -- Not yet used
* key -- The key that the server responds to (used in the [Kinvey Console](https://console.kinvey.com))


To run the server, you can either execute through NPM or by invoking
Node.js directly:

    > git clone https://github.com/kinvey/kinvey-service-link.git
    > cd kinvey-service-link
    > npm install
    > node .
    
or

    > git clone https://github.com/kinvey/kinvey-service-link.git
    > cd kinvey-service-link
    > npm install
    > npm start
    
Configuring the app to talk to your servers is a matter of updating
the file https://github.com/kinvey/kinvey-service-link/blob/master/lib/service_link.js.

Each of the four HTTP verbs has a single function that's invoked on
the request.  Add the code you need to interface with your
servers/services in the correct method.

If you don't support a particular HTTP verb, just call

```js
return next(new restify.NotAuthorizedError("This method is not supported by this host"));
```

The current sample app is just an echo server.


kinvey-service-link is Copyright 2012 Kinvey, Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


  
  
