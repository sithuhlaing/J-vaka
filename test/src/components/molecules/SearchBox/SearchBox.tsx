import React from 'react';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import Label from '../../atoms/Label';
import Icon from '../../atoms/Icon';

export interface SearchBoxProps {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (event: React.FormEvent) => void;
  className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  id = 'search-field',
  placeholder = 'Search',
  value,
  onChange,
  onSubmit,
  className = '',
  ...props
}) => {
  const classes = `nhsuk-header__search-form ${className}`.trim();

  return (
    <div className="nhsuk-header__search">
      <div className="nhsuk-header__search-wrap">
        <form className={classes} onSubmit={onSubmit} role="search" {...props}>
          <Label htmlFor={id} className="nhsuk-u-visually-hidden">
            Search the NHS website
          </Label>
          <Input
            id={id}
            name="q"
            type="search"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete="off"
            className="nhsuk-header__search-input"
          />
          <Button 
            type="submit" 
            className="nhsuk-header__search-submit"
          >
            <Icon name="search" />
            <span className="nhsuk-u-visually-hidden">Search</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SearchBox;