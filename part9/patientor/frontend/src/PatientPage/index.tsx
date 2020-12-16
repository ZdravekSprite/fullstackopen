import React from 'react';
import { Container, Icon } from "semantic-ui-react";

const PatientPage: React.FC = () => {
  return (
    <div className="App">
        <Container textAlign="left">
          <h3>Dana Scully <Icon name="venus" /> </h3>
          <p>ssn: 050174-432N</p>
          <p>occupation: Forensic Pathologist</p>
        </Container>
      </div>
  );
};

export default PatientPage;