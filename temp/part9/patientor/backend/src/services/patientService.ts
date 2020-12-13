import { v4 as uuid } from 'uuid';
import patients from '../../data/patients'
import { NonSensitivePatientEntry, NewPatientEntry, PatientEntry, Gender } from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = (
  name: string, dateOfBirth: string, ssn: string, gender: Gender, occupation: string,
): PatientEntry => {
  const id = uuid();
  const newPatientEntry = {
    id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  }

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry
  }

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  addPatient
};