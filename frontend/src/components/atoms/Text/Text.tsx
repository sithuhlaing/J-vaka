import React from 'react';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'heading-xl' | 'heading-l' | 'heading-m' | 'heading-s' | 'body' | 'body-s' | 'caption';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  as,
  className = '',
  ...props
}) => {
  const variantClasses = {
    'heading-xl': 'nhsuk-heading-xl',
    'heading-l': 'nhsuk-heading-l',
    'heading-m': 'nhsuk-heading-m',
    'heading-s': 'nhsuk-heading-s',
    'body': 'nhsuk-body',
    'body-s': 'nhsuk-body-s',
    'caption': 'nhsuk-caption'
  };

  const defaultElements = {
    'heading-xl': 'h1',
    'heading-l': 'h2',
    'heading-m': 'h3',
    'heading-s': 'h4',
    'body': 'p',
    'body-s': 'p',
    'caption': 'p'
  } as const;

  const elementType = as || defaultElements[variant];
  const classes = `${variantClasses[variant]} ${className}`.trim();

  return React.createElement(
    elementType,
    { className: classes, ...props },
    children
  );
};

export default Text;