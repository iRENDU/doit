const parse = require('csv-parse');
const fs = require('fs');

module.exports = function(filename,options) {
    return new Promise((resolve,reject) => {
        if (!options.hasOwnProperty('columns')) {
            options.columns = true;
        }
        let result = [];
        fs.createReadStream(filename)
            .pipe(parse(options))
            .on('data', function(row) {
                result.push(row);        
            })
            .on('error', function(e) {
                reject(e);
            })
            .on('end',function() {
                resolve(result);
            });
    })
}
