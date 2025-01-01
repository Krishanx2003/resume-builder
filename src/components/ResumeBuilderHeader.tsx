
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HelpCircle } from 'lucide-react'
import { ProgressIndicator } from "./ProgressIndicator";
import { number } from "zod";

const totalSteps = 6;

export function ResumeBuilderHeader({ currentStep }: { currentStep: number }) {
  return (
    <header className="w-full max-w-4xl mx-auto p-6 bg-[#F7F7F7] rounded-lg shadow-md">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#333333]">Create Your Resume</h1>
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-[#007BFF] hover:text-[#0056b3] transition-colors">
                <HelpCircle size={24} />
                <span className="sr-only">Need Assistance?</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h3 className="font-semibold">Need Assistance?</h3>
                <p className="text-sm text-muted-foreground">
                  Hover over this icon for helpful tips and examples related to each section. 
                  This feature is designed to assist you in providing the necessary information 
                  and making informed choices as you build your resume.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <p className="text-[#333333] text-lg">
          Welcome to the Resume Builder! This intuitive tool will guide you through the process 
          of creating a professional resume step by step. Follow the prompts, fill in your 
          information, and watch your resume come to life!
        </p>
        
        <ProgressIndicator currentStep={currentStep}  />
      </div>
    </header>
  )
}

