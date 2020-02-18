module.exports = {
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_PORT: process.env.MONGO_PORT,
    IMPORT_FILE: process.env.IMPORT_FILE,
    IMPORT_PARSE_CONFIG: JSON.parse(process.env.IMPORT_PARSE_CONFIG),
    IMPORT_FILE_MAPPING: JSON.parse(process.env.IMPORT_FILE_MAPPING),
    PATIENT_DB: process.env.PATIENT_DB || 'test',
    PATIENT_COLLECTION: process.env.PATIENT_COLLECTION || 'patients',
    PATIENT_CONSENT_COLLECTION: process.env.PATIENT_CONSENT_COLLECTION || 'EMAIL'
}