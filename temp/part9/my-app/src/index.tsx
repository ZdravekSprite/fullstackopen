import React from "react";
import ReactDOM from 'react-dom';
//import PropTypes from "prop-types";

interface WelcomeProps {
  name: string;
}

const Welcome: React.FC<WelcomeProps> = (props) => {
  return <h1>Hello, {props.name}</h1>;
};
/*
const Welcome = props => {
  return <h1>Hello, {props.name}</h1>;
};

Welcome.propTypes = {
  name: PropTypes.string
};
*/
const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.getElementById("root"));