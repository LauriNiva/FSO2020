import diagnosesData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses = diagnosesData as Diagnose[];

const getDiagnoses = () => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
