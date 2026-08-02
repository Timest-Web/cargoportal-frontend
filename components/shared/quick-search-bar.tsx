"use client"

import { useState, type FormEvent } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type QuickSearchBarProps = {
  placeholder?: string
  buttonLabel?: string
  onSubmit: (value: string) => void
  className?: string
}

export default function QuickSearchBar({
  placeholder = "Search",
  buttonLabel = "Search",
  onSubmit,
  className,
}: QuickSearchBarProps) {
  const [value, setValue] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (value.trim()) onSubmit(value.trim())
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className ?? ""}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="h-12 rounded-xl pl-10 text-base"
        />
      </div>
      <Button type="submit" className="h-12 rounded-xl px-6">
        {buttonLabel}
      </Button>
    </form>
  )
}