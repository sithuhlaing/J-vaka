import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const careCardVariants = cva("nhsuk-care-card border-l-8 border-solid p-6 mb-6 bg-white", {
  variants: {
    variant: {
      "non-urgent": "nhsuk-care-card--non-urgent border-l-blue-600 bg-blue-50",
      urgent: "nhsuk-care-card--urgent border-l-red-600 bg-red-50",
      immediate: "nhsuk-care-card--immediate border-l-red-800 bg-red-100",
    },
  },
  defaultVariants: {
    variant: "non-urgent",
  },
})

const careCardTitleVariants = cva("nhsuk-care-card__heading-container flex items-center gap-3 mb-4", {
  variants: {
    variant: {
      "non-urgent": "text-blue-800",
      urgent: "text-red-800",
      immediate: "text-red-900",
    },
  },
  defaultVariants: {
    variant: "non-urgent",
  },
})

interface CareCardProps extends React.ComponentProps<"div">, VariantProps<typeof careCardVariants> {
  title: string
  children: React.ReactNode
}

function CareCard({ className, variant, title, children, ...props }: CareCardProps) {
  const getIcon = () => {
    switch (variant) {
      case "non-urgent":
        return (
          <svg
            className="nhsuk-icon nhsuk-icon__info w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
        )
      case "urgent":
        return (
          <svg
            className="nhsuk-icon nhsuk-icon__warning w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L2 22h20L12 2zm0 15h-2v-2h2v2zm0-4h-2V9h2v4z" />
          </svg>
        )
      case "immediate":
        return (
          <svg
            className="nhsuk-icon nhsuk-icon__cross w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div
      className={cn(careCardVariants({ variant }), className)}
      role="region"
      aria-labelledby={`care-card-${variant}-title`}
      {...props}
    >
      <div className={cn(careCardTitleVariants({ variant }))}>
        {getIcon()}
        <h3 id={`care-card-${variant}-title`} className="nhsuk-care-card__heading text-xl font-bold m-0">
          {title}
        </h3>
      </div>
      <div className="nhsuk-care-card__content text-gray-800 leading-relaxed">{children}</div>
    </div>
  )
}

export { CareCard, careCardVariants }
