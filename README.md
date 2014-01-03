express-fileuploader-qiniu
===================

QiniuStrategy for [express-fileuploader](https://github.com/heroicyang/express-fileuploader), use this to upload files to Qiniu.

## Install

```bash
npm install express-fileuploader-qiniu --save
```

## Usage

```javascript
var http = require('http');
var express = require('express');
var mutilpart = require('connect-multiparty');
var uploader = require('express-fileuploader');
var QiniuStrategy = require('express-fileuploader-qiniu');

var app = express();
app.use('/upload/image', mutilpart());

uploader.use(new uploader.QiniuStrategy({
  uploadPath: '/uploads',
  options: {
    accessKey: 'your access key',
    secretKey: 'your secret key',
    bucket: 'your bucket name',
    domain: 'http://{bucket}.u.qiniudn.com'
  }
}));

app.post('/upload/image', function(req, res, next) {
  uploader.upload('qiniu', req.files['images'], function(err, files) {
    if (err) {
      return next(err);
    }
    res.send(JSON.stringify(files));
  });
});

http.createServer(app).listen(8000);
```

##License

The MIT License (MIT)

Copyright (c) 2013 Heroic Yang

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
