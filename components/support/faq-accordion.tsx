import { ChevronDown } from "lucide-react"

type FaqItem = {
  question: string
  answer: string
}

type FaqAccordionProps = {
  items: FaqItem[]
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="divide-y rounded-2xl border">
      {items.map((item) => (
        <details key={item.question} className="group px-4 py-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
            {item.question}
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}