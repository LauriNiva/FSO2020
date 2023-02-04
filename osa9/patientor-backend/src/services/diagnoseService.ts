import diagnosesData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses = diagnosesData as Diagnose[];

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
