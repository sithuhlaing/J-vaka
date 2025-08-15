import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  id: string;
  name: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  'aria-describedby'?: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  value,
  options,
  placeholder,
  disabled = false,
  required = false,
  'aria-describedby': ariaDescribedBy,
  className = '',
  onChange,
  onBlur,
  onFocus,
  ...props
}) => {
  const classes = `nhsuk-select ${className}`.trim();

  return (
    <select
      className={classes}
      id={id}
      name={name}
      value={value}
      disabled={disabled}
      required={required}
      aria-describedby={ariaDescribedBy}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;