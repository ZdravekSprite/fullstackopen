import React from 'react';
import axios from "axios";
import { Container, Icon, List } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import { setPatient, useStateValue } from "../state";
import EntryDetail from './EntryDetail';

const PatientPage: React.FC = () => {

  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchDetail = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        console.log("Set patient:", patientData);
        dispatch(setPatient(patientData));
      } catch (e) {
        // eslint-disable-next-line
      console.error(e.response.data);
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
      {console.log(patient)}
      <Container textAlign="left">
        <h3> {patient.name} <Icon name={iconName(patient.gender)} /> </h3>
        <p> SSN: {patient.ssn}</p>
        <p> Birth: {patient.dateOfBirth}</p>
        <p> Occupation: {patient.occupation}</p>
        <h3>entries</h3>
            <List divided relaxed>
                {patient.entries.map(entry =>
                    <List.Item key={entry.id}>
                        <EntryDetail entry={entry} />
                        <List>
                        { entry.diagnosisCodes 
                            ? entry.diagnosisCodes.map(code =>
                                <List.Item key={code}>{code}</List.Item>) 
                            : null}
                        </List>
                    </List.Item>
                )}
            </List>
      </Container>
    </div>
  );
};

export default PatientPage;