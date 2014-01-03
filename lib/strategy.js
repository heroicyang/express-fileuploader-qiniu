/**
 * express-fileuploader-qiniu/lib/strategy.js
 * @author HeroicYang <me@heroicyang.com>
 */

/**
 * Module dependencies
 */
var path = require('path');
var Strategy = require('express-fileuploader').Strategy;
var qn = require('qn');

/**
 * QiniuStrategy
 * Upload file to Qiniu
 *
 * Examples:
 *
 *    var uploader = require('express-fileuploader');
 *    var QiniuStrategy = require('express-fileuploader-qiniu');
 *    
 *    uploader.use(new QiniuStrategy({
 *      uploadPath: '/uploads',
 *      options: {
 *        accessKey: 'your access key',
 *        secretKey: 'your secret key',
 *        bucket: 'your bucket name',
 *        domain: 'http://{bucket}.u.qiniudn.com'
 *      }
 *    }));
 *
 * @param {Object}  options
 *  - uploadPath  required
 *  - options     required   `qn` options
 *    - accessKey  required
 *    - secretKey  required
 *    - bucket     required
 *    - domain     required
 * 
 * @return {Strategy}
 */
module.exports = exports = Strategy.extend({
  name: 'qiniu',
  constructor: function(options) {
    options = options || {};
    this.uploadPath = options.uploadPath;
    this.options = options.options;

    if (!this.uploadPath) {
      throw new Error('QiniuStrategy#uploadPath required.');
    }
    if (!this.options) {
      throw new Error('QiniuStrategy#options required.');
    }
  },
  upload: function(file, callback) {
    var client = qn.create({
      accessKey: this.options.accessKey,
      secretKey: this.options.secretKey,
      bucket: this.options.bucket,
      domain: this.options.domain
    });

    client.uploadFile(file.path, {
      key: path.join(this.uploadPath, file.name)
    }, function(err, result) {
      if (err) {
        return callback(err);
      }
      file.url = result.url;
      callback(null, file);
    });
  }
});