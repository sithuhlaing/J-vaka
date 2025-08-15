import React from 'react';
import Icon from '../../atoms/Icon';

export interface MenuItemProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  showChevron?: boolean;
  className?: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  href,
  children,
  active = false,
  showChevron = true,
  className = '',
  onClick,
  ...props
}) => {
  const classes = `nhsuk-header__navigation-link ${className}`.trim();

  return (
    <li className="nhsuk-header__navigation-item">
      <a 
        className={classes} 
        href={href}
        onClick={onClick}
        {...props}
      >
        {children}
        {showChevron && (
          <Icon name="chevron-right" className="nhsuk-icon nhsuk-icon__chevron-right" />
        )}
      </a>
    </li>
  );
};

export default MenuItem;