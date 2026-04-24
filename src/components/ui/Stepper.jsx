import { Check } from 'lucide-react';

export function Stepper({ steps = [], currentStep = 0, className = '' }) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center flex-1">
          <div className="relative flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                index < currentStep
                  ? 'bg-green-600 text-white'
                  : index === currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index < currentStep ? <Check size={20} /> : index + 1}
            </div>
            <span className="mt-2 text-sm font-medium text-gray-700 text-center whitespace-nowrap">
              {step}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 transition-colors ${
                index < currentStep ? 'bg-green-600' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
