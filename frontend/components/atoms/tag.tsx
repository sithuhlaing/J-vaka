import React from "react"
import { cn } from "@/lib/utils"

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "white"
    | "grey"
    | "green"
    | "aqua-green"
    | "blue"
    | "purple"
    | "pink"
    | "red"
    | "orange"
    | "yellow"
  children: React.ReactNode
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "nhsuk-tag",
          {
            "nhsuk-tag--white": variant === "white",
            "nhsuk-tag--grey": variant === "grey",
            "nhsuk-tag--green": variant === "green",
            "nhsuk-tag--aqua-green": variant === "aqua-green",
            "nhsuk-tag--blue": variant === "blue",
            "nhsuk-tag--purple": variant === "purple",
            "nhsuk-tag--pink": variant === "pink",
            "nhsuk-tag--red": variant === "red",
            "nhsuk-tag--orange": variant === "orange",
            "nhsuk-tag--yellow": variant === "yellow",
          },
          className,
        )}
        {...props}
      >
        {children}
      </span>
    )
  },
)

Tag.displayName = "Tag"

// Helper function to get tag variant based on status
export const getStatusTagVariant = (status: string): TagProps["variant"] => {
  const statusMap: Record<string, TagProps["variant"]> = {
    active: "white",
    started: "grey",
    "not started": "grey",
    new: "green",
    pending: "blue",
    received: "purple",
    sent: "pink",
    rejected: "red",
    declined: "orange",
    delayed: "yellow",
  }

  return statusMap[status.toLowerCase()] || "default"
}

export { Tag }
