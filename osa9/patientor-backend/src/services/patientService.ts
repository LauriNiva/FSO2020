import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients = patientData as Patient[];

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

const getSinglePublicPatient = (id: string): Patient | undefined => {
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

export default {
  getPatients,
  getNonSensitivePatients,
  addNewPatient,
  getSinglePublicPatient,
};
