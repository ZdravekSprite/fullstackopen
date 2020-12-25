import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) => (
        <Part key={i} part={part} />
      ))}
    </div>
  );
};

export default Content;