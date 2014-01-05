/**
 * express-fileuploader-qiniu/test/strategy.test.js
 * @author HeroicYang <me@heroicyang.com>
 */

 /**
  * Module dependencies
  */
var fs = require('fs');
var should = require('should');
var express = require('express');
var mutilpart = require('connect-multiparty');
var request = require('supertest');
var uploader = require('express-fileuploader');
var QiniuStrategy = require('../lib/strategy');

describe('strategy.test.js', function() {
  it('QiniuStrategy#uploadPath is required', function() {
    try {
      var strategy = new QiniuStrategy({
        options: {}
      });
    } catch (e) {
      should.exist(e);
    }
  });

  it('QiniuStrategy#options is required', function() {
    try {
      var strategy = new QiniuStrategy({
        uploadPath: '/uploads'
      });
    } catch (e) {
      should.exist(e);
    }
  });

  it('upload file', function(done) {
    var app = express();
    app.use('/upload/image', mutilpart());

    uploader.use(new QiniuStrategy({
      uploadPath: '/uploads',
      options: {
        accessKey: 'Kn_YmkOa2uAI6fvfeVuv10THmdvKLzKXIDnyltih',
        secretKey: 'O238lG-8e9YR0omD_OClbNVhstfPB5EUUDoX-gmM',
        bucket: 'test-qiniu-strategy',
        domain: 'http://test-qiniu-strategy.u.qiniudn.com'
      }
    }));

    app.post('/upload/image', function(req, res) {
      uploader.upload('qiniu', req.files.avatar, function(err, files) {
        if (err) {
          return res.send({
            error: err
          });
        }
        res.send(files);
      });
    });

    request(app)
      .post('/upload/image')
      .attach('avatar', 'test/fixtures/heroic.jpg')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        should.exist(res.body);
        done();
      });
  });

  it('delete temp files after uploaded', function(done) {
    var app = express();
    app.use('/upload/image', mutilpart());

    uploader.use(new QiniuStrategy({
      uploadPath: '/uploads',
      options: {
        accessKey: 'Kn_YmkOa2uAI6fvfeVuv10THmdvKLzKXIDnyltih',
        secretKey: 'O238lG-8e9YR0omD_OClbNVhstfPB5EUUDoX-gmM',
        bucket: 'test-qiniu-strategy',
        domain: 'http://test-qiniu-strategy.u.qiniudn.com'
      }
    }));

    app.post('/upload/image', function(req, res) {
      uploader.upload('qiniu', req.files.avatar, function(err, files) {
        if (err) {
          return res.send({
            error: err
          });
        }
        res.send(files);
      });
    });

    request(app)
      .post('/upload/image')
      .attach('avatar', 'test/fixtures/heroic.jpg')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        should.exist(res.body);
        fs.exists(res.body[0].path, function(exists) {
          exists.should.not.be.ok;
          done();
        });
      });
  });
});