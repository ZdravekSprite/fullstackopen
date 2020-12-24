import { State } from "./state";
import { Patient, Entry, Diagnosis } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
      id: string;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosisList: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnosisList
        }
      };
      case "ADD_ENTRY":
      if (!state.patient) return state;

      else {

        return {
          ...state,
          patients: {
            ...state.patients,
            [action.id]: {
              ...state.patients[action.id], entries: [
                ...state.patients[action.id].entries, action.payload
              ]
            }
          },
          patient: {
            ...state.patient, entries: [
              ...state.patient.entries, action.payload 
            ]
          }
        };
      }
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: payload
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: payload
  };
};

export const setPatient = (payload: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: payload
  };
};

export const setDiagnosisList = (diagnosisCodes: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnosisCodes
  };
};

export const addEntry = (payload: Entry, id: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: payload,
    id: id
  };
};