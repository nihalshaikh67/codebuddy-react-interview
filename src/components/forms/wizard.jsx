import { useState } from 'react';
import WizardDataContext from './wizard-data';
import MultiStep from '../multi-step-component';
import SignUpDetails from './signup-details';
import BasicDetails from './basic-details';
import BioData from './bio-data';

const Wizard = () => {
  const [wizardData, setWizardData] = useState({
    emailId: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    countryCode: '',
    phoneNumber: '',
    acceptTermsAndCondition: false,
  });
  return (
    <>
      <WizardDataContext.Provider value={{ wizardData, setWizardData }}>
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-6 col-md-12">
            <MultiStep startIndex={0} allowAllPages={false}>
              <SignUpDetails />
              <BasicDetails />
              <BioData />
            </MultiStep>
          </div>
        </div>
      </WizardDataContext.Provider>
    </>
  );
};

export default Wizard;
