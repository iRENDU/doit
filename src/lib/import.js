const reader = require('./csvToJson');
const config = require('../config/config');
const {insertDocs} = require('../db/connection');

async function importPatients(filename,options,mapping) {
    const patients = await reader(filename,options);
    const patientsWithConsent = filndPatientsWithConsent(patients,mapping);
    const patientsWithConsentToImport = formatConsentImport(patientsWithConsent,mapping);
    
    const db = config.PATIENT_DB;
    const collectionPatinets = config.PATIENT_COLLECTION;
    const collectionConsent = config.PATIENT_CONSENT_COLLECTION;
    await (await insertDocs(db,collectionPatinets,patients));
    await (await insertDocs(db,collectionConsent,patientsWithConsentToImport));
    return true;
}

function filndPatientsWithConsent(patients,mapping) {
    const {emailField,consentField,consentYes} = mapping;
    const patientsWithConsent = patients
        .filter((p) => p[consentField] === consentYes && p[emailField]);
        
    return patientsWithConsent;
}

function formatConsentImport(patients,mapping) {
    const {emailField} = mapping;
    return patients.map((p) => {
        return {
            [emailField]: p[emailField],
            'Day 1': '',
            'Day 2': '',
            'Day 3': '',
            'Day 4': '',
        }
    });
}

module.exports = {
    filndPatientsWithConsent: filndPatientsWithConsent,
    importPatients: importPatients,
    formatConsentImport: formatConsentImport
}