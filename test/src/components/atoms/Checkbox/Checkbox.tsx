import React from 'react';

export interface CheckboxProps {
  id: string;
  name: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  'aria-describedby'?: string;
  className?: string;
  children: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  value,
  checked = false,
  disabled = false,
  required = false,
  'aria-describedby': ariaDescribedBy,
  className = '',
  children,
  onChange,
  onBlur,
  onFocus,
  ...props
}) => {
  const classes = `nhsuk-checkboxes__item ${className}`.trim();

  return (
    <div className={classes}>
      <input
        className="nhsuk-checkboxes__input"
        id={id}
        name={name}
        type="checkbox"
        value={value}
        checked={checked}
        disabled={disabled}
        required={required}
        aria-describedby={ariaDescribedBy}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        {...props}
      />
      <label className="nhsuk-label nhsuk-checkboxes__label" htmlFor={id}>
        {children}
      </label>
    </div>
  );
};

export default Checkbox;