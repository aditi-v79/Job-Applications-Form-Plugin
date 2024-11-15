export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience: number;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: number;
}

export interface Profile {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Demographics (Optional)
  gender?: string;
  ethnicity?: string;
  veteranStatus?: boolean;
  disabilityStatus?: boolean;
  
  // Professional Details
  resumeUrl: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  
  // Career
  yearsOfExperience: number;
  currentJobTitle?: string;
  desiredJobTitles: string[];
  salaryExpectations: {
    minimum: number;
    preferred: number;
  };
  willingToRelocate: boolean;
  preferredLocations: string[];
  remotePreference: 'Remote' | 'Hybrid' | 'On-site' | 'Flexible';
  
  // Qualifications
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: string[];
  languages: Array<{
    name: string;
    proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
  }>;
  
  // Application Materials
  coverLetterTemplate: string;
  professionalSummary: string;
  passions: string[];
  achievements: string[];
  
  // Preferences
  workAuthorization: string;
  noticePeriod?: string;
  availableStartDate: string;
  travelPreference: number; // percentage willing to travel
}