import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useWizardDataContext } from './wizard-data';
import useMultiStep from '../multi-step-component/useMultiStep';

const SignUpDetails = () => {
  const { setWizardData, wizardData } = useWizardDataContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailId: wizardData?.emailId || '',
      password: wizardData?.password || '',
    },
  });
  const { nextStep, currentStep, previousStep } = useMultiStep();
  const [isSavedOnly, setIsSavedOnly] = useState(false);
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12">
        <div className="row">
          <form
            className="col-12"
            onSubmit={handleSubmit(data => {
              setWizardData({
                ...wizardData,
                emailId: data.emailId,
                password: data.password,
              });
              if (!isSavedOnly) nextStep();
            })}
          >
            <div className="mb-3">
              <label htmlFor="user-email" className="form-label">
                Email address
              </label>
              <input
                type="text"
                className="form-control"
                id="user-email"
                placeholder="Enter email address"
                {...register('emailId', {
                  required: 'Email id is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email format',
                  },
                })}
              />
              <p className="text-danger mt-1">{errors?.emailId?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="user-password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="user-password"
                className="form-control"
                placeholder="Enter password"
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value:
                      /^(?=.*[A-Z]{2})(?=.*[a-z]{2})(?=.*\d{2})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      'Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters.',
                  },
                })}
              />
              <p className="text-danger mt-1">{errors?.password?.message}</p>
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

export default SignUpDetails;
