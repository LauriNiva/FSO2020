import diagnosesData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses = diagnosesData as Diagnosis[];

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
