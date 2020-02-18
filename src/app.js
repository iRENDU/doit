const {importPatients} = require('./lib/import')
const config = require('./config/config');

const mapping = config.IMPORT_FILE_MAPPING;
const filename = config.IMPORT_FILE;
const options = config.IMPORT_PARSE_CONFIG;

try {
    importPatients(filename,options,mapping);
    console.log('File import success');
} catch (e) {
    console.error(`File import error: ${e.message}`);
    throw e;
}
