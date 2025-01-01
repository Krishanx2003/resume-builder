// context/ResumeContext.tsx
import { createContext, useContext, useState } from 'react';

interface EducationEntry {
  schoolName: string;
  degree: string;
  graduationMonth: string;
  graduationYear: string;
  relevantCourses: string;
}

interface PersonalInfo {
  full_name: string;
  email: string;
  phone_number: string;
  linkedin_profile: string;
  desired_job: string;
  country: string;
  city: string;
  state: string;
  zip_code: string;
}

interface WorkExperience {
  jobTitle: string;
  companyName: string;
  country: string;
  state: string;
  startMonth: number;
  startYear: number;
  endMonth: number | null;
  endYear: number | null;
  currentlyWorkHere: boolean;
  responsibilities: string;
}

interface ResumeContextType {
  educationEntries: EducationEntry[];
  setEducationEntries: (entries: EducationEntry[]) => void;
  personalInfo: PersonalInfo;
  setPersonalInfo: (info: PersonalInfo) => void;
  skills: string[];
  setSkills: (skills: string[]) => void;
  summary: string;
  setSummary: (summary: string) => void;
  workExperiences: WorkExperience[];
  setWorkExperiences: (experiences: WorkExperience[]) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    full_name: '',
    email: '',
    phone_number: '',
    linkedin_profile: '',
    desired_job: '',
    country: '',
    city: '',
    state: '',
    zip_code: '',
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [summary, setSummary] = useState<string>('');
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);

  return (
    <ResumeContext.Provider value={{
      educationEntries,
      setEducationEntries,
      personalInfo,
      setPersonalInfo,
      skills,
      setSkills,
      summary,
      setSummary,
      workExperiences,
      setWorkExperiences,
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};
