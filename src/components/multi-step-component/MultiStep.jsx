import React, { useEffect, useState } from 'react';
import MultiStepContext from './MultiStepContext';

const MultiStep = props => {
  const {
    startIndex,
    children,
    paginationStyles,
    paginationBoxWidth = 40,
    paginationArrowWidth = 40,
    allowAllPages = true,
  } = props;
  const [currentStep, setCurrentStep] = useState(startIndex);
  const componentChildren = React.Children.toArray(children);
  const stepCount = componentChildren.length;
  const [pagesAllowed, setPagesAllowed] = useState(
    Array.from({ length: stepCount }, () => allowAllPages),
  );

  useEffect(() => {
    const tempPagesVisited = [...pagesAllowed];
    tempPagesVisited[startIndex] = true;
    setPagesAllowed(tempPagesVisited);
  }, [startIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const tempPagesVisited = [...pagesAllowed];
    tempPagesVisited[currentStep] = true;
    setPagesAllowed(tempPagesVisited);
  }, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps
  const allowPage = index => {
    const tempPagesVisited = [...pagesAllowed];
    tempPagesVisited[index] = true;
    setPagesAllowed(tempPagesVisited);
  };

  const nextStep = () => {
    if (currentStep < stepCount - 1) {
      allowPage(currentStep + 1);
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      allowPage(currentStep - 1);
      setCurrentStep(currentStep - 1);
    }
  };

  const jumptToStep = index => {
    if (pagesAllowed?.[index])
      if (index >= 0 && index < stepCount) {
        setCurrentStep(index);
      }
  };

  const multiStepValue = {
    previousStep,
    nextStep,
    currentStep,
    jumptToStep,
    stepCount,
    allowPage,
    pagesAllowed,
  };

  return (
    <MultiStepContext.Provider value={multiStepValue}>
      <>
        <div width="100%" className="stepper-scrollbar" style={{ ...paginationStyles }}>
          <MultiStepPagination
            currentStep={currentStep}
            stepCount={stepCount}
            arrowWidth={paginationArrowWidth}
            boxWidth={paginationBoxWidth}
            jumpToStep={jumptToStep}
          />
        </div>
        {componentChildren?.[currentStep]}
      </>
    </MultiStepContext.Provider>
  );
};

const MultiStepPagination = props => {
  const { currentStep, stepCount, jumpToStep } = props;

  return (
    <div className="h-3 mb-4">
      <div
        className="d-flex justify-content-between"
        style={{ minWidth: 'fit-content', height: '8px' }}
      >
        {Array.from({ length: stepCount }, (_, index) => index).map(step => (
          <div
            style={{
              backgroundColor: step <= currentStep ? '#0d6efd' : '#CCC4BA',
              width: `calc(${100 / stepCount}% - 12px)`,
              height: '8px',
            }}
            onClick={() => {
              jumpToStep(step);
            }}
            role="button"
            onKeyPress={() => {
              jumpToStep(step);
            }}
            tabIndex={step}
            aria-label={`'tab-${step}'`}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiStep;
