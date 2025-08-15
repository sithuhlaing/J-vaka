import React from 'react';

export interface InputProps {
  id: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number';
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  spellCheck?: boolean;
  'aria-describedby'?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type = 'text',
  value,
  placeholder,
  required = false,
  disabled = false,
  autoComplete,
  spellCheck,
  'aria-describedby': ariaDescribedBy,
  className = '',
  onChange,
  onBlur,
  onFocus,
  ...props
}) => {
  const classes = `nhsuk-input ${className}`.trim();

  return (
    <input
      className={classes}
      id={id}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      autoComplete={autoComplete}
      spellCheck={spellCheck}
      aria-describedby={ariaDescribedBy}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      {...props}
    />
  );
};

export default Input;