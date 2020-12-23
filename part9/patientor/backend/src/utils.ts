import {
  NewPatient,
  Gender,
  newEntry,
  BaseEntry,
  Diagnose,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing Name ${name}`);
  }
  return name;
};

const isDate = (dob: string): boolean => {
  return Boolean(Date.parse(dob));
};

const parseDOB = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`Incorrect or missing DOB ${dateOfBirth}`);
  }
  return dateOfBirth;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing SSN ${ssn}`);
  }
  return ssn;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing Gender ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation ${occupation}`);
  }
  return occupation;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDOB(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entries: object.entries
  };
};

const isNewBaseEntry = (entry: any): entry is BaseEntry => {
  if (entry.diagnosisCodes) {
    if (!parseDiagnosis(entry.diagnosisCodes)) {
      throw new Error(`Incorrect Diagnosis Code ${entry.diagnosis}`);
    }
  }

  if (
    !entry ||
    !isString(entry.description) ||
    !isDate(entry.date) ||
    !isString(entry.specialist)
  ) {
    throw new Error('Incorrect description, date or specialist');
  }

  return entry;
};

const parseDiagnosis = (
  diagnosisCodes: any
): diagnosisCodes is Array<Diagnose['code']> => {
  return diagnosisCodes.every((diagnosisCode: any) => isString(diagnosisCode));
};

const isHospitalEntry = (entry: any): entry is HospitalEntry => {
  if (entry.discharge) {
    return (
      Object.keys(entry.discharge).includes('date') &&
      Object.keys(entry.discharge).includes('criteria')
    );
  }
  return false;
};

const isOccupationalHealthcareEntry = (
  entry: any
): entry is OccupationalHealthcareEntry => {
  if (entry.employerName) {
    if (entry.sickLeave) {
      return (
        Object.keys(entry.sickLeave).includes('startDate') &&
        Object.keys(entry.sickLeave).includes('endDate')
      );
    }
    return true;
  }
  return false;
};

const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
  if (
    entry.healthCheckRating === undefined &&
    !isString(entry.healthCheckRating)
  ) {
    return false;
  }
  return entry;
};

const toNewEntry = (object: any): newEntry => {
  if (!isNewBaseEntry(object)) {
    throw new Error(`Not base entry ${object}`);
  }
  if (isHospitalEntry(object)) {
    return object;
  } else if (isOccupationalHealthcareEntry(object)) {
    return object;
  } else if (isHealthCheckEntry(object)) {
    return object;
  } else {
    throw new Error(`Not an entry from the above types.`);
  }
};

export default { toNewPatient, toNewEntry };