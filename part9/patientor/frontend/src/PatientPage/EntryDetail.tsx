import React from 'react';
import { Entry } from '../types';

const EntryDetail: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      {entry.date} { entry.description}
    </div>
  );
};

export default EntryDetail;