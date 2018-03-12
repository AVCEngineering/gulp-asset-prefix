var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var gulpAssetPrefix = require('../index.js');

function testWrapper (input, prefix, expected) {
  return function (done) {
    var fakeFile = new File({
      contents: new Buffer(input)
    });
    var prefixer = gulpAssetPrefix({
      prefix: prefix
    });

    prefixer.write(fakeFile);
    prefixer.once('data', function (file) {
      assert.ok(file.isBuffer());
      assert.equal(file.contents.toString(), expected);
      done();
    });
  };
}

describe('gulp-asset-prefix', function () {

  describe('tags', function () {
    it('should prepend prefix to img tag', testWrapper(
      '<img src="/img/placeholder.png" />',
      '//cdn.js',
      '<img src="//cdn.js/img/placeholder.png" />'
    ));

    it('should prepend prefix to link tag', testWrapper(
      '<link href="/css/index.css" />',
      '//cdn.js',
      '<link href="//cdn.js/css/index.css" />'
    ));

    it('should prepend prefix to script tag', testWrapper(
      '<script src="/js/index.js" />',
      '//cdn.js',
      '<script src="//cdn.js/js/index.js" />'
    ));
  });
});
