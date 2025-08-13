import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'blue' | 'green' | 'red' | 'yellow' | 'grey' | 'white';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantClass = variant !== 'default' ? `nhsuk-tag--${variant}` : '';
  const classes = `nhsuk-tag ${variantClass} ${className}`.trim();

  return (
    <strong className={classes} {...props}>
      {children}
    </strong>
  );
};

export default Badge;