var assert = require('assert');

var fs = require('fs');
var path = require('path');

var recursiveReadSync = require('recursive-readdir-sync')

var cmacc = require('cmacc-compiler');

var dir = __dirname;

describe('test', function () {

    var files = recursiveReadSync('.');

    files.forEach(function (file) {

        if (file.match(/.cmacc$/) && fs.existsSync(file.replace(/.cmacc$/, '.html'))) {

            it('should ' + file, function () {
                var spec = fs.readFileSync(file.replace(/.cmacc$/, '.html'), 'utf8');

                var ast = cmacc.compile('file://' + path.join(dir, file));
                fs.writeFileSync(file.replace(/.cmacc$/, '.json'), JSON.stringify(ast, null, 4), 'utf8');

                var md = cmacc.resolve(ast);
                var html = cmacc.marked(md);

                var result = html;
                fs.writeFileSync(file.replace(/.cmacc$/, '.html'), result, 'utf8');
                //console.log(result)
                assert.equal(result, spec);
            });
        }


    });

    console.log(dir);

});