import { v4 as uuid } from 'uuid';
import patients from '../../data/patients'
import { Patient, PublicPatient, NewPatient, newEntry, Entry } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

const postEntry = (newEntry: newEntry, patientID: string): Entry => {
  const id = uuid();
  const entryWithID = { ...newEntry, id };
  patients.forEach((patient) => {
    if (patient.id === patientID) {
      patient.entries.push(entryWithID);
      return patient;
    }
    return patient;
  });

  return entryWithID;
};

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  postEntry
};