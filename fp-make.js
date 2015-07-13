var program = require('commander');
var fs = require('fs');
var path = require('path');
var filewalker = require('filewalker');
var createHash = require('crypto').createHash;

program
  .option('-o, --out <file>', 'Output file', 'filepack.json')
  .option('-i, --in <folder>', 'Input folder', '.')
  .parse(process.argv);

var options = {
  maxPending: 10, // throttle handles
};

function hashSync(fullPath) {
  var hash = createHash('md5');
  return hash.update(fs.readFileSync(fullPath)).digest('hex');
}

/*
 * @param {String} path folder to walk
 * @param {Object} obj in which to store file/folder objects
 * @return {Object} filepack object
 */
function walkFolder(dir) {
  var ret = {};
  var list = fs.readdirSync(dir);
  list.forEach(function(file) {
    var fullPath = path.resolve(dir, file);
    var stat = fs.statSync(fullPath);
    if (stat) { 
      if (stat.isDirectory()) {
        if(!ret.hasOwnProperty('dirs')) {
          ret.dirs = [];
        }
        var rec = walkFolder(fullPath);
        var dirObj = {name: file};
        if(rec.files) {
          dirObj.files = rec.files;
        }
        if(rec.dirs) {
          dirObj.dirs = rec.dirs;
        }
        ret.dirs.push(dirObj);
      } else {
        if(!ret.hasOwnProperty('files')) {
          ret.files = [];
        }
        ret.files.push({name: file, md5: hashSync(fullPath)});
      }
    }
  });
  return ret;
}

var started = Date.now();
var obj = {};
obj.filepack = walkFolder(program.in);
var objStr = JSON.stringify(obj, null, '\t');
fs.writeFileSync(program.out, objStr);
