import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: string[]
  error?: string
  accessibility?: {
    "aria-label"?: string
  }
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, accessibility, ...props }, ref) => {
    const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${selectId}-error` : undefined

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          id={selectId}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500",
            className,
          )}
          ref={ref}
          aria-label={accessibility?.["aria-label"]}
          aria-describedby={error ? errorId : undefined}
          role="combobox"
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </option>
          ))}
        </select>
        {error && (
          <p id={errorId} className="text-sm text-red-500 flex items-center gap-1">
            <span className="sr-only">Error:</span>
            {error}
          </p>
        )}
      </div>
    )
  },
)

Select.displayName = "Select"
