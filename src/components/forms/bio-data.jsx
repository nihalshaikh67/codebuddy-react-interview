import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useWizardDataContext } from './wizard-data';
import useMultiStep from '../multi-step-component/useMultiStep';

export const BASE_URL = 'https://codebuddy.review';

const BioData = () => {
  const { setWizardData, wizardData } = useWizardDataContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      countryCode: wizardData?.countryCode || '',
      phoneNumber: wizardData?.phoneNumber || '',
      acceptTermsAndCondition: wizardData?.acceptTermsAndCondition || false,
    },
  });
  const { currentStep, previousStep } = useMultiStep();
  const navigate = useNavigate();
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12">
        <div className="row">
          <form
            className="col-12"
            onSubmit={handleSubmit(data => {
              setWizardData({
                ...wizardData,
                countryCode: data.countryCode,
                phoneNumber: data.phoneNumber,
                acceptTermsAndCondition: data.acceptTermsAndCondition,
              });

              const payload = {
                ...wizardData,
                countryCode: data.countryCode,
                phoneNumber: data.phoneNumber,
              };
              if ('acceptTermsAndCondition' in payload) {
                delete payload.acceptTermsAndCondition;
              }

              fetch(`${BASE_URL}/submit`, {
                method: 'POST',
                body: JSON.stringify(payload),
              }).then(resp => {
                if (resp.status === 200) {
                  navigate('/posts');
                }
              });
            })}
          >
            <div className="mb-3">
              <label htmlFor="country-code" className="form-label">
                Country code
              </label>
              <select
                placeholder="Select country code"
                className="form-select"
                {...register('countryCode', {
                  required: 'Country code is required',
                })}
              >
                <option value="" selected disabled hidden>
                  Select a country code
                </option>
                <option value="India (+91)">India (+91)</option>
                <option value="America (+1)">America (+1)</option>
              </select>
              <p className="text-danger mt-1">{errors?.countryCode?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="user-phone-number" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                id="user-phone-number"
                className="form-control"
                placeholder="Enter phone number"
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                  minLength: {
                    value: 10,
                    message: 'Invalid phone number',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Invalid phone number',
                  },
                })}
              />
              <p className="text-danger mt-1">{errors?.phoneNumber?.message}</p>
            </div>
            <div className="mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="user-phone-number"
                  placeholder="name@example.com"
                  {...register('acceptTermsAndCondition', {
                    required: 'Terms and condition required',
                  })}
                />
                <label htmlFor="user-phone-number" className="form-check-label">
                  Accept Terms & Condition
                </label>
              </div>
              <p className="text-danger mt-1">{errors?.acceptTermsAndCondition?.message}</p>
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
                <button type="submit" className="col-12 btn btn-primary">
                  Save
                </button>
              </div>

              <div className="col-xl-4 col-lg-4 col-md-4 mb-3">
                <button type="submit" className="col-12 btn btn-primary disabled">
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

export default BioData;
