import { Button } from "@/components/ui/button";
import { Contact2, Sparkles, GraduationCap, Medal, BookText, BookOpen, Link2, FileCheck } from 'lucide-react';
import Link from "next/link";


export default function Sidebar() {
  return (
    <div className="hidden w-64 flex-shrink-0 border-r bg-white p-4 md:block">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-orange-500">resumegenius</h1>
      </div>
      <nav className="space-y-2">
        <Link href="/resume/PersonalInfo">
          <Button variant="default" className="w-full justify-start gap-2 bg-blue-500 hover:bg-blue-600">
            <Contact2 className="h-4 w-4" />
            Contact
          </Button>
        </Link>
        <Link href="/resume/WorkExperience">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Sparkles className="h-4 w-4" />
            Experience
          </Button>
        </Link>
        <Link href="/resume/Education">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <GraduationCap className="h-4 w-4" />
            Education
          </Button>
        </Link>
      
        <Link href="/resume/Skills">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <BookText className="h-4 w-4" />
            Skills
          </Button>
        </Link>
        <Link href="/resume/Summary">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <BookOpen className="h-4 w-4" />
            Summary
          </Button>
        </Link>
       
        <Link href="/resume/finalize">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <FileCheck className="h-4 w-4" />
            Finalize
          </Button>
        </Link>
      </nav>
    </div>
  );
}
