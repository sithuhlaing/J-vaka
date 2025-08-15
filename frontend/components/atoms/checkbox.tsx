import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  accessibility?: {
    "aria-label"?: string
  }
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, accessibility, ...props }, ref) => {
    const checkboxId = props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="flex items-center space-x-2">
        <input
          id={checkboxId}
          type="checkbox"
          className={cn(
            "h-4 w-4 rounded border border-input bg-background text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          aria-label={accessibility?.["aria-label"]}
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
      </div>
    )
  },
)

Checkbox.displayName = "Checkbox"
