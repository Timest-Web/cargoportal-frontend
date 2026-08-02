import { Check } from "lucide-react"

export type TimelineStep = {
  label: string
  timestamp?: string
}

type VerticalTimelineProps = {
  steps: TimelineStep[]
  currentStepIndex: number
  className?: string
}

export default function VerticalTimeline({ steps, currentStepIndex, className }: VerticalTimelineProps) {
  return (
    <ol className={className}>
      {steps.map((step, i) => {
        const isComplete = i < currentStepIndex
        const isCurrent = i === currentStepIndex
        const isLast = i === steps.length - 1

        return (
          <li key={step.label} className="relative flex gap-3 pb-5 last:pb-0">
            {!isLast && (
              <div
                className={`absolute left-2.75 top-6 h-[calc(100%-8px)] w-0.5 ${
                  isComplete ? "bg-primary" : "bg-muted-foreground/20"
                }`}
              />
            )}

            <div
              className={`z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium ${
                isComplete
                  ? "border-primary bg-primary text-primary-foreground"
                  : isCurrent
                    ? "border-primary text-primary"
                    : "border-muted-foreground/30 text-muted-foreground"
              }`}
            >
              {isComplete ? <Check className="h-3 w-3" /> : i + 1}
            </div>

            <div className="pt-0.5">
              <p
                className={`text-sm font-medium ${
                  isComplete || isCurrent ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </p>
              {step.timestamp && <p className="text-xs text-muted-foreground">{step.timestamp}</p>}
              {isCurrent && !step.timestamp && <p className="text-xs text-primary">In progress</p>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}