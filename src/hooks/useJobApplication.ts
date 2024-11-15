import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface FormData {
  position: string;
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resume: string;
  coverLetter: string;
}

interface FormErrors {
  [key: string]: string;
}

const INITIAL_STATE: FormData = {
  position: '',
  company: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  resume: '',
  coverLetter: ''
};

export const useJobApplication = () => {
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = localStorage.getItem('jobApplicationDraft');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Valid phone number is required';
    }
    
    if (formData.resume && !formData.resume.startsWith('http')) {
      newErrors.resume = 'Valid URL is required';
    }
    
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    } else if (formData.coverLetter.length < 100) {
      newErrors.coverLetter = 'Cover letter should be at least 100 characters';
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      // Here you would typically send the data to your backend
      console.log('Submitting application:', formData);
      alert('Application submitted successfully!');
      handleClear();
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  const handleSave = () => {
    localStorage.setItem('jobApplicationDraft', JSON.stringify(formData));
    alert('Application draft saved!');
  };

  const handleClear = () => {
    setFormData(INITIAL_STATE);
    localStorage.removeItem('jobApplicationDraft');
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleSave,
    handleClear,
    isValid,
    errors
  };
};