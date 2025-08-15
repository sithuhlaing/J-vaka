import React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "reverse" | "warning"
  size?: "sm" | "md" | "lg"
  preventDoubleClick?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", preventDoubleClick = false, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          "nhsuk-button",
          {
            // NHS Primary Button (default)
            "": variant === "primary",
            // NHS Secondary Button
            "nhsuk-button--secondary": variant === "secondary",
            // NHS Reverse Button (for dark backgrounds)
            "nhsuk-button--reverse": variant === "reverse",
            // NHS Warning Button
            "nhsuk-button--warning": variant === "warning",
            // NHS Disabled Button
            "nhsuk-button--disabled": disabled,
          },
          className,
        )}
        data-module="nhsuk-button"
        data-prevent-double-click={preventDoubleClick ? "true" : undefined}
        disabled={disabled}
        aria-disabled={disabled ? "true" : undefined}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button }
