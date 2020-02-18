let assert = require('assert');
const addContext = require('mochawesome/addContext');
const config = require('../src/config/config');
const {filndPatientsWithConsent,formatConsentImport} = require('../src/lib/import');
const reader = require('../src/lib/csvToJson');
const {getDocs} = require('../src/db/connection');

describe('Import test', function() {
  const mapping = config.IMPORT_FILE_MAPPING;
  const filename = config.IMPORT_FILE;
  const options = config.IMPORT_PARSE_CONFIG;
  const {emailField,consentField,consentYes,firstNameField,idField} = mapping;
  const db = config.PATIENT_DB;
  const collectionPatinets = config.PATIENT_COLLECTION;
  const collectionConsent = config.PATIENT_CONSENT_COLLECTION;
  let patientsCollection,patientsFile,emailsCollection;

  before(async function() {
    patientsFile = await reader(filename,options);
    patientsCollection = await getDocs(db,collectionPatinets);
    emailsCollection = await getDocs(db,collectionConsent)      
  })

  describe('Collection integrity check', function() {
    it('Both collection should be equeal', function() {
      assert.deepEqual(patientsFile,patientsCollection);
    });
  });

  describe('File first name check',  function() {
    it('Following patients dont have first names', function() {
      let ids = patientsCollection.filter((p) => !p[firstNameField]).map((p) => p[idField]).toString();
      addContext(this,ids)
      assert.ok(ids);
    });  
  });

  describe('Find ids of patient with missing emails but consent', function() {
    it('Following patients dont have consent but no email', function() {
      let ids = patientsCollection
        .filter((p) => p[consentField] === consentYes && !p[emailField])
        .map((p) => p[idField])
        .toString();

      addContext(this,ids)
      assert.ok(ids);
    });
  });

  describe('Verify consent email created', function() {
    it('Check that email collection is has correct emails', function() {
      const emailsFromCollection = filndPatientsWithConsent(patientsCollection,mapping);
      assert.deepEqual(
        emailsCollection.map((e) => e[emailField]),
        emailsFromCollection.map((e) => e[emailField])
      )
    });
  });

  describe('Verify consent email shedule', function() {
    it('Check that email collection emails are correct', function() {
      const emailsFromCollection = formatConsentImport(
        filndPatientsWithConsent(patientsCollection,mapping)
        ,mapping
      );

      assert.deepEqual(
        emailsCollection.map((e) => e[emailField]),
        emailsFromCollection.map((e) => e[emailField])
      )
    });
  });
});