import React from 'react';
import { UserCircle } from 'lucide-react';
import { ProfileManager } from './components/ProfileManager';
import { AutofillButton } from './components/AutofillButton';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <UserCircle className="h-12 w-12 text-indigo-600 mx-auto" />
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
            Job Application Profile
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Save your information once, use it everywhere
          </p>
        </div>

        <div className="mb-6 text-center">
          <AutofillButton className="mx-auto" />
        </div>
        
        <ProfileManager />
      </div>
    </div>
  );
}

export default App;