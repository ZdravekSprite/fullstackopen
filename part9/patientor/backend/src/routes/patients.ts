import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.get('/:id', (req,res) => {
  res.send(patientService.getPatients().find(patient => patient.id === req.params.id));
});

router.post('/', (req, res) => {
  console.log(req.body);
  try {
    const newPatientEntry = utils.toNewPatient(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = utils.toNewEntry(req.body);
    const patientId = req.params.id;
    const addedEntry = patientService.postEntry(newEntry, patientId);
    res.json(addedEntry);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;