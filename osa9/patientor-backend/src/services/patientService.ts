import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  EntryWithoutId,
} from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return patients.map(({ dateOfBirth, gender, id, name, occupation }) => ({
    dateOfBirth,
    gender,
    id,
    name,
    occupation,
  }));
};

const getSinglePatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addNewPatient = (patientEntry: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  const createdPatient: Patient = {
    id,
    ...patientEntry,
  };
  patients.push(createdPatient);
  return createdPatient;
};

const addNewEntry = (patientId: string, newEntry: EntryWithoutId) => {
  const id: string = uuid();

  const addedEntry = { ...newEntry, id };

  patients
    .find((patient) => patient.id === patientId)
    ?.entries.push(addedEntry);

  return addedEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addNewPatient,
  addNewEntry,
  getSinglePatient,
};
