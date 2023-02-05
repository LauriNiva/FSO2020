import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = patientService.addNewPatient(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  );
  res.json(newPatient);
});

export default router;
