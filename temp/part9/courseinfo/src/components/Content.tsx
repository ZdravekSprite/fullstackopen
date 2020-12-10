import React from 'react';
import { CoursePart } from '../types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        switch (part.name) {
          case "Fundamentals":
            //
            break;
          case "Using props to pass data":
            //
            break;
          case "Deeper type usage":
            //
            break;
          default:
            return assertNever(part);
          }
      }
      )};
    </div>
  );
};

export default Content;