import React from 'react';
import Label from '../../atoms/Label';
import Input, { InputProps } from '../../atoms/Input';
import Text from '../../atoms/Text';

export interface FormFieldProps extends Omit<InputProps, 'id' | 'name'> {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  hint,
  error,
  className = '',
  ...inputProps
}) => {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const ariaDescribedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const fieldClass = `nhsuk-form-group ${error ? 'nhsuk-form-group--error' : ''}`.trim();
  const inputClass = `${error ? 'nhsuk-input--error' : ''} ${className}`.trim();

  return (
    <div className={fieldClass}>
      <Label htmlFor={id}>{label}</Label>
      
      {hint && (
        <div className="nhsuk-hint" id={hintId}>
          {hint}
        </div>
      )}
      
      {error && (
        <Text variant="body" className="nhsuk-error-message" id={errorId}>
          <span className="nhsuk-u-visually-hidden">Error:</span>
          {error}
        </Text>
      )}
      
      <Input
        id={id}
        name={name}
        className={inputClass}
        aria-describedby={ariaDescribedBy}
        {...inputProps}
      />
    </div>
  );
};

export default FormField;