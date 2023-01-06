import React from 'react';
import MultiStepContext from './MultiStepContext';

const useMultiStep = () => {
  const context = React.useContext(MultiStepContext);

  if (!context) throw Error('Wrapper missing!');
  return context;
};

export default useMultiStep;
