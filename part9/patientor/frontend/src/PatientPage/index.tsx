import React from 'react';
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";

const PatientPage: React.FC = () => {

  const [patient, setPatient] = React.useState<Patient>();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchDetail = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        console.log("Set patient:", patientData);
        setPatient(patientData);
      } catch (e) {
        console.error(e);
      }
    };
    // eslint-disable-next-line
    fetchDetail();
  }, [id]);

  if (!patient) {
    return (<div>Loading...</div>);
  }

  const iconName = (x: Gender): "venus" | "mars" | "genderless" => {
    switch (x) {
      case Gender.Female:
        return "venus";
      case Gender.Male:
        return "mars";
      default:
        return "genderless";
    }
  };
  return (
    <div className="App">
      <Container textAlign="left">
        <h3> {patient.name} <Icon name={iconName(patient.gender)} /> </h3>
        <p> SSN: {patient.ssn}</p>
        <p> Birth: {patient.dateOfBirth}</p>
        <p> Occupation: {patient.occupation}</p>
      </Container>
    </div>
  );
};

export default PatientPage;