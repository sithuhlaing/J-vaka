"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

interface FieldError {
  message: string
  type: "error" | "warning"
}

interface EnhancedInputProps {
  id: string
  label: string
  type?: "text" | "email" | "password" | "tel"
  placeholder?: string
  value: string
  onChange: (value: string) => void
  validation?: ValidationRule
  disabled?: boolean
  className?: string
  helpText?: string
  required?: boolean
}

export function EnhancedInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  validation,
  disabled,
  className,
  helpText,
  required
}: EnhancedInputProps) {
  const [error, setError] = useState<FieldError | null>(null)
  const [touched, setTouched] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const validateField = (val: string): FieldError | null => {
    if (!validation) return null

    if (validation.required && !val.trim()) {
      return { message: `${label} is required`, type: "error" }
    }

    if (val && validation.minLength && val.length < validation.minLength) {
      return { 
        message: `${label} must be at least ${validation.minLength} characters`, 
        type: "error" 
      }
    }

    if (val && validation.maxLength && val.length > validation.maxLength) {
      return { 
        message: `${label} must be no more than ${validation.maxLength} characters`, 
        type: "error" 
      }
    }

    if (val && validation.pattern && !validation.pattern.test(val)) {
      return { message: `Please enter a valid ${label.toLowerCase()}`, type: "error" }
    }

    if (val && validation.custom) {
      const customError = validation.custom(val)
      if (customError) {
        return { message: customError, type: "error" }
      }
    }

    return null
  }

  useEffect(() => {
    if (touched || value) {
      const fieldError = validateField(value)
      setError(fieldError)
      setIsValid(!fieldError && value.trim().length > 0)
    }
  }, [value, touched, validation])

  const handleBlur = () => {
    setTouched(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const inputType = type === "password" && showPassword ? "text" : type

  return (
    <div className={cn("space-y-2", className)}>
      <Label 
        htmlFor={id} 
        className={cn(
          "flex items-center gap-1",
          error?.type === "error" && "text-red-600"
        )}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      
      <div className="relative">
        <Input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={cn(
            "transition-all duration-200",
            error?.type === "error" && "border-red-500 focus:border-red-500 focus:ring-red-500",
            isValid && !error && "border-green-500 focus:border-green-500",
            type === "password" && "pr-10"
          )}
          aria-invalid={error?.type === "error"}
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
        />
        
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
        
        {isValid && !error && (
          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
        )}
      </div>
      
      {error && (
        <div 
          id={`${id}-error`}
          className="flex items-center gap-2 text-sm text-red-600"
          role="alert"
        >
          <AlertCircle className="h-4 w-4" />
          {error.message}
        </div>
      )}
      
      {helpText && !error && (
        <p id={`${id}-help`} className="text-sm text-muted-foreground">
          {helpText}
        </p>
      )}
    </div>
  )
}

interface EnhancedTextareaProps {
  id: string
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  validation?: ValidationRule
  disabled?: boolean
  className?: string
  helpText?: string
  required?: boolean
  rows?: number
}

export function EnhancedTextarea({
  id,
  label,
  placeholder,
  value,
  onChange,
  validation,
  disabled,
  className,
  helpText,
  required,
  rows = 4
}: EnhancedTextareaProps) {
  const [error, setError] = useState<FieldError | null>(null)
  const [touched, setTouched] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const validateField = (val: string): FieldError | null => {
    if (!validation) return null

    if (validation.required && !val.trim()) {
      return { message: `${label} is required`, type: "error" }
    }

    if (val && validation.minLength && val.length < validation.minLength) {
      return { 
        message: `${label} must be at least ${validation.minLength} characters`, 
        type: "error" 
      }
    }

    if (val && validation.maxLength && val.length > validation.maxLength) {
      return { 
        message: `${label} must be no more than ${validation.maxLength} characters`, 
        type: "error" 
      }
    }

    return null
  }

  useEffect(() => {
    if (touched || value) {
      const fieldError = validateField(value)
      setError(fieldError)
      setIsValid(!fieldError && value.trim().length > 0)
    }
  }, [value, touched, validation])

  const handleBlur = () => {
    setTouched(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label 
        htmlFor={id} 
        className={cn(
          "flex items-center gap-1",
          error?.type === "error" && "text-red-600"
        )}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      
      <div className="relative">
        <Textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          rows={rows}
          className={cn(
            "transition-all duration-200",
            error?.type === "error" && "border-red-500 focus:border-red-500 focus:ring-red-500",
            isValid && !error && "border-green-500 focus:border-green-500"
          )}
          aria-invalid={error?.type === "error"}
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
        />
        
        {validation?.maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {value.length}/{validation.maxLength}
          </div>
        )}
      </div>
      
      {error && (
        <div 
          id={`${id}-error`}
          className="flex items-center gap-2 text-sm text-red-600"
          role="alert"
        >
          <AlertCircle className="h-4 w-4" />
          {error.message}
        </div>
      )}
      
      {helpText && !error && (
        <p id={`${id}-help`} className="text-sm text-muted-foreground">
          {helpText}
        </p>
      )}
    </div>
  )
}

// Form validation hook
export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Partial<Record<keyof T, ValidationRule>>
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})

  const validateField = (name: keyof T, value: any): string | null => {
    const rule = validationRules[name]
    if (!rule) return null

    if (rule.required && (!value || value.toString().trim() === "")) {
      return `${String(name)} is required`
    }

    if (value && rule.minLength && value.toString().length < rule.minLength) {
      return `${String(name)} must be at least ${rule.minLength} characters`
    }

    if (value && rule.maxLength && value.toString().length > rule.maxLength) {
      return `${String(name)} must be no more than ${rule.maxLength} characters`
    }

    if (value && rule.pattern && !rule.pattern.test(value.toString())) {
      return `Please enter a valid ${String(name)}`
    }

    if (value && rule.custom) {
      return rule.custom(value.toString())
    }

    return null
  }

  const setValue = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }))
    
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const setFieldTouched = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, values[name])
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const validateAll = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {}
    let isValid = true

    Object.keys(validationRules).forEach(key => {
      const name = key as keyof T
      const error = validateField(name, values[name])
      if (error) {
        newErrors[name] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    setTouched(Object.keys(validationRules).reduce((acc, key) => {
      acc[key as keyof T] = true
      return acc
    }, {} as Record<keyof T, boolean>))

    return isValid
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0
  }
}