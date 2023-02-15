import {
  Diagnosis,
  Discharge,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  NewPatient,
  SickLeave,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};
const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };

  return newPatient;
};

type FieldsForNewEntry = {
  type: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  discharge: unknown;
  employerName: unknown;
  sickLeave: unknown;
  healthCheckRating: unknown;
};

const isEntryType = (
  type: string
): type is 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' => {
  return !!(type === 'HealthCheck' || 'Hospital' || 'OccupationalHealthcare');
};

const parseType = (
  type: unknown
): 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};
const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};
const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const isArrayOfDiagnosiscodes = (
  diagnosisCodes: Array<unknown>
): diagnosisCodes is Array<Diagnosis['code']> => {
  return diagnosisCodes.every((dc) => isString(dc));
};

const parseDiagnosiscodes = (
  diagnosisCodes: unknown
): Array<Diagnosis['code']> => {
  if (
    !diagnosisCodes ||
    !Array.isArray(diagnosisCodes) ||
    !isArrayOfDiagnosiscodes(diagnosisCodes)
  ) {
    throw new Error('Incorrect or missing diagnosisCodes: ' + diagnosisCodes);
  }

  return diagnosisCodes;
};

const isHealthCheckRating = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  healthCheckRating: any
): healthCheckRating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    !healthCheckRating ||
    !isString(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      'Incorrect or missing healthCheckRating: ' + healthCheckRating
    );
  }
  return healthCheckRating;
};

const isDischarge = (discharge: {
  date?: unknown;
  criteria?: unknown;
}): discharge is Discharge => {
  const date = discharge.date;
  const criteria = discharge.criteria;

  if (
    !date ||
    !isString(date) ||
    !isDate(date) ||
    !criteria ||
    !isString(criteria)
  )
    return false;
  return true;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName: ' + employerName);
  }
  return employerName;
};

const isSickLeave = (sickLeave: {
  startDate?: unknown;
  endDate?: unknown;
}): sickLeave is SickLeave => {
  const startDate = sickLeave.startDate;
  const endDate = sickLeave.endDate;

  if (
    !startDate ||
    !isString(startDate) ||
    !isDate(startDate) ||
    !endDate ||
    !isString(endDate) ||
    !isDate(endDate)
  )
    return false;
  return true;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
  }
  return sickLeave;
};

export const toNewEntry = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating,
  discharge,
  employerName,
  sickLeave,
}: FieldsForNewEntry): EntryWithoutId => {
  const parsedType = parseType(type);

  switch (parsedType) {
    case 'Hospital':
      return {
        type: 'Hospital',
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: diagnosisCodes
          ? parseDiagnosiscodes(diagnosisCodes)
          : undefined,
        discharge: parseDischarge(discharge),
      };
    case 'HealthCheck':
      return {
        type: 'HealthCheck',
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: diagnosisCodes
          ? parseDiagnosiscodes(diagnosisCodes)
          : undefined,
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
    case 'OccupationalHealthcare':
      return {
        type: 'OccupationalHealthcare',
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: diagnosisCodes
          ? parseDiagnosiscodes(diagnosisCodes)
          : undefined,
        employerName: parseEmployerName(employerName),
        sickLeave: sickLeave ? parseSickLeave(sickLeave) : undefined,
      };
    default: {
      const _exhaustiveCheck: never = parsedType;
      return _exhaustiveCheck;
    }
  }

  // const baseEntry: EntryWithoutId = {
  //   type: parseType(type),
  //   description: parseDescription(description),
  //   date: parseDate(date),
  //   specialist: parseSpecialist(specialist),
  //   diagnosisCodes: diagnosisCodes
  //     ? parseDiagnosiscodes(diagnosisCodes)
  //     : undefined,
  //   discharge: discharge ? parseDischarge(discharge) : undefined,
  //   healthCheckRating: healthCheckRating ? parseHealthCheckRating(healthCheckRating) : undefined,
  //   employerName: employerName? parseEmployername(employerName) : undefined,
  //   sickLeave: sickLeave ? parseSickleave(sickLeave) : undefined,
  // };

  // const parsedType = parseType(type);

  // switch (parsedType) {
  //   case 'Hospital':
  //     return {
  //       ...baseEntry,
  //       type: 'Hospital',
  //       discharge: parseDischarge(discharge),
  //     };
  //   case 'HealthCheck':
  //     return {
  //       ...baseEntry,
  //       type: 'HealthCheck',
  //       healthCheckRating: parseHealthCheckRating(healthCheckRating),
  //     };
  //   case 'OccupationalHealthcare':
  //     return {
  //       ...baseEntry,
  //       type: 'OccupationalHealthcare',
  //       employerName: parseEmployername(employerName),
  //       sickLeave: sickLeave ? parseSickleave(sickLeave) : undefined,
  //     };
  //   default: {
  //     const _exhaustiveCheck: never = baseEntry;
  //     return _exhaustiveCheck;
  //   }
  // }
};
