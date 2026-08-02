import Link from "next/link"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type ButtonVariantProps = VariantProps<typeof buttonVariants>

export default function LinkButton({
  href,
  children,
  variant,
  size,
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: ButtonVariantProps["variant"]
  size?: ButtonVariantProps["size"]
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </Link>
  )
}