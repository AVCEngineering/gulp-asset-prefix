var through = require('through2');
var PLUGIN_NAME = 'gulp-asset-prefix';

module.exports = function (options) {
  var prefix = options && options.prefix || '';
  var patterns = [
    /(<img.*src=['"](?!\/\/))(\/.*)(['\"].*>)/gm,
    /(<link.*href=['"](?!\/\/))(\/.*)(['\"].*>)/gm,
    /(<script.*src=['"](?!\/\/))(\/.*)(['\"].*>)/gm
  ];

  return through.obj(function (file, encoding, callback) {
    // ignore empty file
    if (file.isNull()) {
      return callback();
    }

    // throw error is file is a stream
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not currently supported'));
      return callback();
    }

    // run regex replace on file contents for each of the patterns
    var contents = patterns.reduce(function (acc, pattern) {
      return acc.replace(pattern, '$1' + options.prefix + '$2$3');
    }, file.contents.toString());

    file.contents = new Buffer(contents);

    return callback(null, file);
  });
};
