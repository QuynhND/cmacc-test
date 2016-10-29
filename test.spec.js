var assert = require('assert');

var fs = require('fs');
var path = require('path');

var recursiveReadSync = require('recursive-readdir-sync')

var cmacc = require('cmacc-compiler');

var dir = __dirname;

function run(file) {
    var ast = cmacc.compile('file://' + path.join(dir, file));
    var md = cmacc.resolve(ast);
    var html = cmacc.marked(md);
    return html;
}

describe('test', function () {

    var files = recursiveReadSync('.');

    files.forEach(function (file) {

        if (file.match(/.cmacc$/) && fs.existsSync(file.replace(/.cmacc$/, '.html'))) {

            it('should ' + file, function () {
                var spec = fs.readFileSync(file.replace(/.cmacc$/, '.html'), 'utf8');
                var result = run(file);
                //fs.writeFileSync(file.replace(/.cmacc$/, '.html'), result, 'utf8');
                //console.log(result)
                assert.equal(result, spec);
            });
        }


    });

    console.log(dir);

});