import React, { useState, useRef, useEffect } from 'react';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import FormField from '../../molecules/FormField';

export interface LoginFormProps {
  onSubmit: (email: string, password: string, role: 'employee' | 'oh-professional' | 'manager') => void;
  isLoading?: boolean;
  demoUsers?: Array<{
    role: string;
    email: string;
    name: string;
  }>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  demoUsers = [],
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'employee' | 'oh-professional' | 'manager'>('employee');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    form?: string;
  }>({});
  const [statusMessage, setStatusMessage] = useState('');

  const errorSummaryRef = useRef<HTMLDivElement>(null);

  // Clear status message after a delay
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'Enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Enter your password';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors and status
    setErrors({});
    setStatusMessage('');

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatusMessage('There is a problem with your submission. Check the errors above.');
      
      // Focus on error summary for screen readers
      setTimeout(() => {
        if (errorSummaryRef.current) {
          errorSummaryRef.current.focus();
        }
      }, 100);
      return;
    }

    setStatusMessage('Signing you in...');
    onSubmit(email, password, role);
  };

  const fillDemoUser = (userRole: string) => {
    const user = demoUsers.find(u => u.role === userRole);
    if (user) {
      setEmail(user.email);
      setPassword('demo123');
      setRole(user.role as 'employee' | 'oh-professional' | 'manager');
      // Clear any existing errors
      setErrors({});
      setStatusMessage(`Demo account details filled for ${user.name}`);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="nhsuk-width-container">
      <main className="nhsuk-main-wrapper" id="main-content" role="main">
        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-two-thirds">
            <Text variant="heading-xl">Sign in to Jivaka System</Text>
            
            {/* Status message for screen readers */}
            <div 
              className="nhsuk-u-visually-hidden" 
              aria-live="polite" 
              aria-atomic="true"
            >
              {statusMessage}
            </div>

            {/* Error summary */}
            {hasErrors && (
              <div 
                ref={errorSummaryRef}
                className="nhsuk-error-summary" 
                aria-labelledby="error-summary-title" 
                role="alert" 
                tabIndex={-1}
              >
                <Text variant="heading-m" id="error-summary-title">
                  There is a problem
                </Text>
                <div className="nhsuk-error-summary__body">
                  <ul className="nhsuk-list nhsuk-error-summary__list">
                    {errors.email && (
                      <li>
                        <a href="#email">{errors.email}</a>
                      </li>
                    )}
                    {errors.password && (
                      <li>
                        <a href="#password">{errors.password}</a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="nhsuk-form" noValidate>
              <FormField
                id="email"
                name="email"
                type="email"
                label="Email address"
                hint="Enter the email address you use to access your account"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                spellCheck={false}
                required
                error={errors.email}
              />

              <FormField
                id="password"
                name="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                error={errors.password}
              />

              <div className="nhsuk-form-group">
                <label className="nhsuk-label" htmlFor="role">
                  Login as
                </label>
                <div className="nhsuk-hint" id="role-hint">
                  Select your role in the organization
                </div>
                <select
                  className="nhsuk-select"
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'employee' | 'oh-professional' | 'manager')}
                  aria-describedby="role-hint"
                  required
                >
                  <option value="employee">Employee</option>
                  <option value="oh-professional">OH Professional</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              <div className="nhsuk-checkboxes nhsuk-form-group">
                <fieldset className="nhsuk-fieldset">
                  <div className="nhsuk-checkboxes__item">
                    <input
                      className="nhsuk-checkboxes__input"
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="nhsuk-label nhsuk-checkboxes__label" htmlFor="remember-me">
                      Remember me
                    </label>
                  </div>
                </fieldset>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                aria-describedby={isLoading ? 'loading-status' : undefined}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>

              {isLoading && (
                <div id="loading-status" className="nhsuk-u-visually-hidden" aria-live="polite">
                  Please wait, signing you in...
                </div>
              )}

              <Text variant="body">
                <a 
                  className="nhsuk-link" 
                  href="#forgot-password"
                  aria-describedby="forgot-password-help"
                >
                  Forgot your password?
                </a>
                <div id="forgot-password-help" className="nhsuk-u-visually-hidden">
                  This will open password recovery options
                </div>
              </Text>
            </form>
          </div>

          {demoUsers.length > 0 && (
            <div className="nhsuk-grid-column-one-third">
              <div className="nhsuk-card" role="region" aria-labelledby="demo-accounts-heading">
                <div className="nhsuk-card__content">
                  <Text variant="heading-m" id="demo-accounts-heading" className="nhsuk-card__heading">
                    Demo accounts
                  </Text>
                  <Text variant="body" className="nhsuk-card__description">
                    Use these demo accounts to explore different user roles
                  </Text>
                  
                  <div className="nhsuk-u-margin-bottom-4" role="list" aria-label="Available demo accounts">
                    {demoUsers.map((user, index) => (
                      <div key={index} className="nhsuk-u-margin-bottom-3" role="listitem">
                        <Text variant="heading-s" className="nhsuk-u-margin-bottom-1">
                          {user.name}
                        </Text>
                        <Text variant="body-s" className="nhsuk-u-margin-bottom-2">
                          {user.email}
                        </Text>
                        <Button
                          variant="secondary"
                          onClick={() => fillDemoUser(user.role)}
                          aria-describedby={`demo-${index}-description`}
                        >
                          Use this account
                        </Button>
                        <div id={`demo-${index}-description`} className="nhsuk-u-visually-hidden">
                          This will fill the login form with {user.name}'s credentials for {user.role} role
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="nhsuk-inset-text" role="note" aria-labelledby="help-heading">
                <span className="nhsuk-u-visually-hidden" id="help-heading">Information: </span>
                <Text variant="body">
                  Need help? Contact IT Support for assistance with accessing your account.
                </Text>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoginForm;