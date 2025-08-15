import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  validation?: "email" | "password" | "text"
  accessibility?: {
    "aria-label"?: string
    "aria-describedby"?: string
  }
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, validation, accessibility, ...props }, ref) => {
    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${inputId}-error` : undefined
    const hintId = `${inputId}-hint`

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-base font-semibold leading-tight text-[var(--nhs-text-color)] mb-1"
          >
            {label}
            {props.required && (
              <span className="text-[var(--nhs-error-color)] ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {/* NHS Hint Text */}
        {validation === "email" && (
          <div id={hintId} className="text-sm text-[var(--nhs-secondary-text-color)] mb-2">
            For example, name@example.com
          </div>
        )}

        <input
          id={inputId}
          type={type}
          className={cn(
            "nhs-input block w-full px-3 py-2 text-base border-2 rounded transition-colors",
            "border-[var(--nhs-dark-grey)] bg-[var(--nhs-white)] text-[var(--nhs-text-color)]",
            "placeholder:text-[var(--nhs-secondary-text-color)]",
            "focus-visible:outline-none focus-visible:ring-0 focus-visible:border-[var(--nhs-text-color)]",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--nhs-pale-grey)]",
            error && "nhs-input--error border-[var(--nhs-error-color)] focus-visible:border-[var(--nhs-error-color)]",
            className,
          )}
          ref={ref}
          aria-label={accessibility?.["aria-label"]}
          aria-describedby={cn(
            error ? errorId : undefined,
            validation === "email" ? hintId : undefined,
            accessibility?.["aria-describedby"],
          )}
          aria-invalid={error ? "true" : "false"}
          aria-required={props.required ? "true" : "false"}
          autoComplete={validation === "email" ? "email" : validation === "password" ? "current-password" : undefined}
          {...props}
        />

        {error && (
          <div id={errorId} className="nhs-error-message text-sm font-semibold flex items-start gap-2 mt-1">
            <span className="inline-block w-4 h-4 mt-0.5 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </span>
            <span>
              <span className="sr-only">Error: </span>
              {error}
            </span>
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = "Input"
