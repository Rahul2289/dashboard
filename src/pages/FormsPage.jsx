import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Select } from '../components/ui/Select.jsx';
import { DatePicker } from '../components/ui/DatePicker.jsx';
import { Stepper } from '../components/ui/Stepper.jsx';

export function FormsPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    startDate: null,
  });

  const steps = ['Personal Info', 'Contact Details', 'Review'];

  const countryOptions = [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'Australia', value: 'AU' },
    { label: 'Germany', value: 'DE' },
    { label: 'France', value: 'FR' },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <Input
              label="First Name"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
            />
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
            <Select
              label="Country"
              options={countryOptions}
              value={formData.country}
              onChange={(value) => handleInputChange('country', value)}
              placeholder="Select a country"
              searchable
              required
            />
            <DatePicker
              label="Start Date"
              value={formData.startDate}
              onChange={(date) => handleInputChange('startDate', date)}
              required
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">First Name</p>
              <p className="font-semibold text-gray-900">{formData.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Name</p>
              <p className="font-semibold text-gray-900">{formData.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-gray-900">{formData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Country</p>
              <p className="font-semibold text-gray-900">
                {countryOptions.find((c) => c.value === formData.country)?.label || '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Start Date</p>
              <p className="font-semibold text-gray-900">
                {formData.startDate?.toLocaleDateString() || '-'}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Forms</h1>
        <p className="text-gray-600 mt-1">Multi-step form example with all input components</p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900">Registration Form</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <Stepper steps={steps} currentStep={currentStep} />
          <div className="mt-6">{renderStepContent()}</div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between gap-3 w-full">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button variant="primary" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
