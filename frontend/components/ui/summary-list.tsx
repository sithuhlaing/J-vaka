import type * as React from "react"
import { cn } from "@/lib/utils"

interface SummaryListProps extends React.ComponentProps<"dl"> {}

function SummaryList({ className, ...props }: SummaryListProps) {
  return <dl className={cn("nhsuk-summary-list border-t border-gray-300", className)} {...props} />
}

interface SummaryListRowProps extends React.ComponentProps<"div"> {}

function SummaryListRow({ className, ...props }: SummaryListRowProps) {
  return (
    <div
      className={cn(
        "nhsuk-summary-list__row border-b border-gray-200 py-3 flex flex-col sm:flex-row sm:items-start",
        className,
      )}
      {...props}
    />
  )
}

interface SummaryListKeyProps extends React.ComponentProps<"dt"> {}

function SummaryListKey({ className, ...props }: SummaryListKeyProps) {
  return (
    <dt
      className={cn("nhsuk-summary-list__key font-bold text-gray-900 mb-1 sm:mb-0 sm:w-1/3 sm:pr-4", className)}
      {...props}
    />
  )
}

interface SummaryListValueProps extends React.ComponentProps<"dd"> {}

function SummaryListValue({ className, ...props }: SummaryListValueProps) {
  return <dd className={cn("nhsuk-summary-list__value text-gray-800 sm:w-2/3 m-0", className)} {...props} />
}

interface SummaryListActionsProps extends React.ComponentProps<"dd"> {}

function SummaryListActions({ className, ...props }: SummaryListActionsProps) {
  return <dd className={cn("nhsuk-summary-list__actions mt-2 sm:mt-0 sm:text-right", className)} {...props} />
}

export { SummaryList, SummaryListRow, SummaryListKey, SummaryListValue, SummaryListActions }
