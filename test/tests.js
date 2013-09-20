var should = require('should');
var server = require('../lib/server');

describe('KinveyServiceLink-UnitTest', function(){

    describe('Server', function(){
        var makeReqFail = function(done){
            var reqFail = function(arg){
                should.exist(arg);
                arg.should.be.an.instanceof(Error);
                done();
            };
            return reqFail;
        };

        describe('#preGet', function(){
            it('should fail if no req', function(done){
                var next = makeReqFail(done);
                server.preGet(null, null, next);
            });
        });
        describe('#preDel', function(){
            it('should fail if no req')
        });
        describe('#prePut', function(){
            it('should fail if no req')
        });
        describe('#prePost', function(){
            it('should fail if no req')
        });
    });

    describe('ServiceLink', function(){
        it('should do stuff');
    });

});
