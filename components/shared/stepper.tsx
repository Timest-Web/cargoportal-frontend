import { Check } from "lucide-react"

type Step = { label: string }

type StepperProps = {
  steps: Step[]
  currentStep: number
  className?: string
}

export default function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <ol className={`flex items-center ${className ?? ""}`}>
      {steps.map((step, i) => {
        const isComplete = i < currentStep
        const isCurrent = i === currentStep
        return (
          <li key={step.label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium ${
                  isComplete
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                      ? "border-primary text-primary"
                      : "border-muted-foreground/30 text-muted-foreground"
                }`}
              >
                {isComplete ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={`hidden text-xs font-medium sm:block ${
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 rounded-full ${
                  isComplete ? "bg-primary" : "bg-muted-foreground/20"
                }`}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}