import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient, Gender } from '../types';

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

const addNewPatient = (
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id: string = uuid() as string;

  const createdPatient: Patient = {
    id,
    name: name,
    dateOfBirth: dateOfBirth,
    ssn: ssn,
    gender: gender,
    occupation: occupation,
  };
  patients.push(createdPatient);
  return createdPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addNewPatient,
};
