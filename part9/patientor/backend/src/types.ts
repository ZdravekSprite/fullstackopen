export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

//export type Diagnose = 'ok' | 'not ok';

export type Gender = 'male' | 'female' | 'other';

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;