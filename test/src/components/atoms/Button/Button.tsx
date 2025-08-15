import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'reverse' | 'warning';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  'data-module'?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  onClick,
  className = '',
  'data-module': dataModule = 'nhsuk-button',
  ...props
}) => {
  const baseClasses = 'nhsuk-button';
  const variantClasses = {
    primary: '',
    secondary: 'nhsuk-button--secondary',
    reverse: 'nhsuk-button--reverse',
    warning: 'nhsuk-button--warning'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      data-module={dataModule}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;