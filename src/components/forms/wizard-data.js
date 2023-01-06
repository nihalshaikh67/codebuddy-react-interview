import React from 'react';

const WizardDataContext = React.createContext(null);

export const useWizardDataContext = () => {
  const context = React.useContext(WizardDataContext);
  if (!context) throw Error('Wrapper missing!');
  return context;
};

export default WizardDataContext;
