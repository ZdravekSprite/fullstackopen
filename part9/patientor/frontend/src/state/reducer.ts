import { State } from './state';
import { Patient, Diagnose, Entry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'UPDATE_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSIS_LIST';
      payload: Diagnose[];
    }
  | {
      type: 'ADD_ENTRY';
      id: string;
      payload: Entry;
    };

export const setPatientList = (patients: Patient[]): Action => {
  return { type: 'SET_PATIENT_LIST', payload: patients };
};

export const addPatient = (patient: Patient): Action => {
  return { type: 'ADD_PATIENT', payload: patient };
};

export const updatePatient = (patient: Patient): Action => {
  return { type: 'UPDATE_PATIENT', payload: patient };
};

export const setDiagnosisList = (diagnosis: Diagnose[]): Action => {
  return { type: 'SET_DIAGNOSIS_LIST', payload: diagnosis };
};

export const addEntry = (id: string, entry: Entry): Action => {
  return { type: 'ADD_ENTRY', id: id, payload: entry };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis,
        },
      };
    case 'ADD_ENTRY': {
      const newPatients = state.patients[action.id];
      console.log(newPatients);
      if(!newPatients.entries) {
         return state;
      }
      newPatients.entries.push(action.payload);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.id]: newPatients,
        },
      };
    }

    default:
      return state;
  }
};