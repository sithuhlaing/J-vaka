import React from 'react';

export interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  className = '',
  ...props
}) => {
  const classes = `nhsuk-label ${className}`.trim();

  return (
    <label className={classes} htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
};

export default Label;