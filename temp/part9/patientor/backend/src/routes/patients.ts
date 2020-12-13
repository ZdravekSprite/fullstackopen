import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});
/*
router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newDiaryEntry = patientService.addEntry(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  );
  res.json(newDiaryEntry);
});
*/
router.post('/', (req, res) => {
  console.log(req.body);
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

export default router;