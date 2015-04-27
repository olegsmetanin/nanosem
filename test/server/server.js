var assert = require('assert');
var http = require('http');

describe('server', function() {
  before(function() {
    server.listen(8000);
  });

  after(function() {
    server.close();
  });


  describe('/hello', function() {
    it('should return 200', function(done) {
      http.get('http://localhost:8000/hello', function(res) {
        assert.equal(200, res.statusCode);
        done();
      });
    });

    it('should say "Hello, world!"', function(done) {
      http.get('http://localhost:8000/hello', function(res) {
        var data = '';

        res.on('data', function(chunk) {
          data += chunk;
        });

        res.on('end', function() {
          assert.equal('Hello, world!\n', data);
          done();
        });
      });
    });
  });


});