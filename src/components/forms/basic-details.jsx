import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useWizardDataContext } from './wizard-data';
import useMultiStep from '../multi-step-component/useMultiStep';

const BasicDetails = () => {
  const { setWizardData, wizardData } = useWizardDataContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: wizardData?.firstName || '',
      lastName: wizardData?.lastName || '',
      address: wizardData?.address || '',
    },
  });
  const { nextStep, currentStep, previousStep } = useMultiStep();
  const [isSavedOnly, setIsSavedOnly] = useState(false);
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12">
        <div className="row">
          <form
            onSubmit={handleSubmit(data => {
              setWizardData({
                ...wizardData,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
              });
              if (!isSavedOnly) nextStep();
            })}
          >
            <div className="mb-3">
              <label htmlFor="first-name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="first-name"
                placeholder="Enter first name"
                {...register('firstName', {
                  required: 'First name is required',
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: 'Only alphabets allowed',
                  },
                  minLength: {
                    value: 2,
                    message: 'Min 2 characters required.',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Max 50 characters required.',
                  },
                })}
              />
              <p className="text-danger mt-1">{errors?.firstName?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="user-password" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                className="form-control"
                placeholder="Enter last name"
                {...register('lastName', {
                  pattern: {
                    value: /^$|^[A-Za-z]+$/,
                    message: 'Last name can only contain alphabets',
                  },
                })}
              />
              <p className="text-danger mt-1">{errors?.lastName?.message}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="user-address" className="form-label">
                Address
              </label>
              <textarea
                type="text"
                id="user-address"
                className="form-control"
                placeholder="Enter address"
                {...register('address', {
                  required: 'Address is required',
                  minLength: {
                    value: 10,
                    message: 'Minimum 10 characters required.',
                  },
                })}
              />
              <p className="text-danger mt-1">{errors?.address?.message}</p>
            </div>
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 mb-3">
                <button
                  type="button"
                  className={`col-12 btn btn-secondary ${currentStep === 0 && 'disabled'}`}
                  onClick={() => {
                    previousStep();
                  }}
                >
                  Back
                </button>
              </div>

              <div className="col-xl-4 col-lg-4 col-md-4 mb-3">
                <button
                  onClick={() => {
                    setIsSavedOnly(true);
                  }}
                  type="submit"
                  className="col-12 btn btn-primary"
                >
                  Save
                </button>
              </div>

              <div className="col-xl-4 col-lg-4 col-md-4 mb-3">
                <button
                  onClick={() => {
                    setIsSavedOnly(false);
                  }}
                  type="submit"
                  className="col-12 btn btn-primary"
                >
                  Save & Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
