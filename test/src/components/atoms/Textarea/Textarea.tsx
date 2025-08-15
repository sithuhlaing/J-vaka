import React from 'react';

export interface TextareaProps {
  id: string;
  name: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  'aria-describedby'?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  name,
  value,
  placeholder,
  rows = 5,
  cols,
  maxLength,
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
  const classes = `nhsuk-textarea ${className}`.trim();

  return (
    <textarea
      className={classes}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      rows={rows}
      cols={cols}
      maxLength={maxLength}
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

export default Textarea;