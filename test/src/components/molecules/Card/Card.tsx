import React from 'react';
import Text from '../../atoms/Text';

export interface CardProps {
  children: React.ReactNode;
  heading?: string;
  description?: string;
  clickable?: boolean;
  href?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  heading,
  description,
  clickable = false,
  href,
  className = '',
  ...props
}) => {
  const baseClasses = 'nhsuk-card';
  const clickableClass = clickable ? 'nhsuk-card--clickable' : '';
  const classes = `${baseClasses} ${clickableClass} ${className}`.trim();

  const CardContent = () => (
    <div className="nhsuk-card__content">
      {heading && (
        <Text variant="heading-m" className="nhsuk-card__heading">
          {heading}
        </Text>
      )}
      {description && (
        <Text variant="body" className="nhsuk-card__description">
          {description}
        </Text>
      )}
      {children}
    </div>
  );

  if (clickable && href) {
    return (
      <div className={classes} {...props}>
        <a href={href} className="nhsuk-card__link">
          <CardContent />
        </a>
      </div>
    );
  }

  return (
    <div className={classes} {...props}>
      <CardContent />
    </div>
  );
};

export default Card;