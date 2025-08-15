import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#007f3b] text-white hover:bg-[#005a2b] focus:outline-4 focus:outline-[#ffeb3b] focus:outline-offset-0 border-2 border-transparent focus:border-[#007f3b]",
        destructive:
          "bg-[#d5281b] text-white hover:bg-[#aa1e13] focus:outline-4 focus:outline-[#ffeb3b] focus:outline-offset-0 border-2 border-transparent focus:border-[#d5281b]",
        secondary:
          "bg-[#f0f4f5] text-[#212b32] hover:bg-[#e8edee] focus:outline-4 focus:outline-[#ffeb3b] focus:outline-offset-0 border-2 border-transparent focus:border-[#212b32]",
        outline:
          "bg-transparent border-2 border-[#005eb8] text-[#005eb8] hover:bg-[#005eb8] hover:text-white focus:outline-4 focus:outline-[#ffeb3b] focus:outline-offset-0 focus:border-[#005eb8]",
        ghost:
          "bg-transparent text-[#005eb8] hover:bg-[#f0f4f5] hover:text-[#005eb8] focus:outline-4 focus:outline-[#ffeb3b] focus:outline-offset-0",
        link: "text-[#005eb8] underline underline-offset-4 hover:text-[#003d7a] focus:outline-4 focus:outline-[#ffeb3b] focus:outline-offset-0 bg-transparent border-none p-0 h-auto",
      },
      size: {
        default: "min-h-[44px] px-4 py-3 text-base has-[>svg]:px-3",
        sm: "min-h-[36px] px-3 py-2 text-sm has-[>svg]:px-2.5",
        lg: "min-h-[52px] px-6 py-4 text-lg has-[>svg]:px-5",
        icon: "size-[44px] p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
