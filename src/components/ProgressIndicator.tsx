import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  currentStep: number;
}

const steps = ["Personal Info"];

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Step {currentStep}: {steps[currentStep - 1]}</span>
        <span>{currentStep} of {steps.length}</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
}
