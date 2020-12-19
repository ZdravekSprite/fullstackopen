import React from 'react';
import { Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry
} from '../types';
import { Icon } from 'semantic-ui-react';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div>
      <div>
        <h1>
          {entry.date} <Icon name="hospital" />
        </h1>
      </div>
      <p>
        <i>{entry.description}</i>
      </p>
    </div>
  );
};

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <div>
      <h1>
        {entry.date} <Icon name="user doctor" />
      </h1>
      <p>
        <i>{entry.description}</i>
      </p>
    </div>
  );
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <div>
      <h1>
        {entry.date} <Icon name="medkit" />
      </h1>
      <p>
        <i>{entry.description}</i>
      </p>
      {entry.healthCheckRating === 0 && (
        <Icon name="heart" color="green" size="large" />
      )}
      {(entry.healthCheckRating === 1 || entry.healthCheckRating === 2) && (
        <Icon name="heart" color="yellow" size="large" />
      )}
      {entry.healthCheckRating === 3 && (
        <Icon name="heart" color="red" size="large" />
      )}
    </div>
  );
};

const EntryDetail: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetail;