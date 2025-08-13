import React from 'react';

export interface IconProps {
  name: 'search' | 'close' | 'tick' | 'arrow-right' | 'arrow-left' | 'chevron-right' | 'chevron-left';
  size?: number;
  'aria-hidden'?: boolean;
  focusable?: boolean;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  'aria-hidden': ariaHidden = true,
  focusable = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'nhsuk-icon';
  const classes = `${baseClasses} nhsuk-icon__${name} ${className}`.trim();

  const iconPaths = {
    search: "m19 17-4-4c0.904-0.732 1.5-1.859 1.5-3.124a6.5 6.5 0 1 0 -6.5 6.5c1.265 0 2.392-0.596 3.124-1.5l4 4 1.876-1.876zM6.5 9.124a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1 -5 0z",
    close: "M13.41 12l5.3-5.29a1 1 0 1 0-1.42-1.42L12 10.59l-5.29-5.3a1 1 0 0 0-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 0 0 1.42 1.42l5.29-5.3 5.29 5.3a1 1 0 0 0 1.42-1.42z",
    tick: "M9 12l2 2 4-4",
    'arrow-right': "m15.5 12-4-4v3h-7v2h7v3z",
    'arrow-left': "m8.5 12 4-4v3h7v2h-7v3z",
    'chevron-right': "m15.5 12-4-4v3h-7v2h7v3z",
    'chevron-left': "m8.5 12 4-4v3h7v2h-7v3z"
  };

  return (
    <svg 
      className={classes}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      aria-hidden={ariaHidden}
      focusable={focusable}
      width={size}
      height={size}
      {...props}
    >
      <path d={iconPaths[name]} />
    </svg>
  );
};

export default Icon;