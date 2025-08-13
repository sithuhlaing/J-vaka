import React from 'react';

export interface AlertProps {
  children: React.ReactNode;
  type?: 'success' | 'warning' | 'severe-warning';
  title?: string;
  role?: 'alert' | 'status';
  'aria-labelledby'?: string;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  children,
  type = 'warning',
  title,
  role = 'alert',
  'aria-labelledby': ariaLabelledBy,
  className = '',
  ...props
}) => {
  const typeClass = type ? `nhsuk-warning-callout--${type}` : '';
  const classes = `nhsuk-warning-callout ${typeClass} ${className}`.trim();


  return (
    <div className={classes} role={role} aria-labelledby={ariaLabelledBy} {...props}>
      <h3 className="nhsuk-warning-callout__label">
        <span>
          <span className="nhsuk-u-visually-hidden">{type}: </span>
          {title || (type === 'success' ? 'Success' : type === 'warning' ? 'Important' : 'Warning')}
        </span>
      </h3>
      <div className="nhsuk-warning-callout__content">
        {children}
      </div>
    </div>
  );
};

export default Alert;