import React from 'react';
import { FileText } from 'lucide-react';
import { useProfileStore } from '../hooks/useProfileStore';

interface AutofillButtonProps {
  className?: string;
}

export const AutofillButton: React.FC<AutofillButtonProps> = ({ className = '' }) => {
  const profile = useProfileStore((state) => state.profile);

  const handleAutofill = () => {
    // Get all form inputs
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach((input) => {
      const element = input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      const name = element.name.toLowerCase();
      
      // Common field mappings
      const mappings: Record<string, keyof typeof profile> = {
        'first-name': 'firstName',
        'last-name': 'lastName',
        'firstname': 'firstName',
        'lastname': 'lastName',
        'email': 'email',
        'phone': 'phone',
        'resume': 'resumeUrl',
        'linkedin': 'linkedinUrl',
        'github': 'githubUrl',
        'portfolio': 'portfolioUrl',
        'salary': 'salaryExpectations',
        'experience': 'yearsOfExperience',
        'gender': 'gender',
        'ethnicity': 'ethnicity',
        'veteran': 'veteranStatus',
        'disability': 'disabilityStatus',
      };

      // Try to find a matching field from our profile
      const fieldKey = mappings[name] || Object.keys(profile).find(key => 
        name.includes(key.toLowerCase())
      );

      if (fieldKey && profile[fieldKey as keyof typeof profile]) {
        const value = profile[fieldKey as keyof typeof profile];
        
        // Handle checkboxes and radio buttons
        if (element instanceof HTMLInputElement && (element.type === 'checkbox' || element.type === 'radio')) {
          if (typeof value === 'boolean') {
            element.checked = value;
          } else if (typeof value === 'string' && element.value.toLowerCase() === value.toLowerCase()) {
            element.checked = true;
          }
        }
        // Handle other input types
        else {
          if (typeof value === 'object') {
            // Handle salary ranges
            if ('minimum' in value && name.includes('min')) {
              element.value = value.minimum;
            } else if ('preferred' in value && name.includes('desired')) {
              element.value = value.preferred;
            }
          } else {
            element.value = value.toString();
          }
        }

        // Trigger change event
        element.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  };

  return (
    <button
      onClick={handleAutofill}
      className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
      title="Autofill form with your saved profile"
    >
      <FileText className="h-4 w-4 mr-2" />
      Autofill
    </button>
  );
};