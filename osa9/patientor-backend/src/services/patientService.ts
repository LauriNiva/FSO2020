import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient } from '../types';

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

export default {
  getPatients,
  getNonSensitivePatients,
};
