import React from 'react';

export interface DatePickerProps {
  id: string;
  name: string;
  value?: string;
  min?: string;
  max?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  'aria-describedby'?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  id,
  name,
  value,
  min,
  max,
  required = false,
  disabled = false,
  readOnly = false,
  'aria-describedby': ariaDescribedBy,
  className = '',
  onChange,
  onBlur,
  onFocus,
  ...props
}) => {
  const classes = `nhsuk-input nhsuk-input--width-10 ${className}`.trim();

  return (
    <input
      className={classes}
      id={id}
      name={name}
      type="date"
      value={value}
      min={min}
      max={max}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      aria-describedby={ariaDescribedBy}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      {...props}
    />
  );
};

export default DatePicker;