import React, { useState } from 'react';

interface LoginScreenProps {
    onLogin: (email: string, password: string, role: 'employee' | 'oh-professional' | 'manager') => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'employee' | 'oh-professional' | 'manager'>('employee');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
            onLogin(email, password, role);
            setIsLoading(false);
        }, 1000);
    };

    const demoUsers = [
        { role: 'employee', email: 'john.smith@company.com', name: 'John Smith (Employee)' },
        { role: 'oh-professional', email: 'dr.johnson@company.com', name: 'Dr. Sarah Johnson (OH Professional)' },
        { role: 'manager', email: 'rebecca.martinez@company.com', name: 'Rebecca Martinez (Manager)' }
    ];

    const fillDemoUser = (userRole: string) => {
        const user = demoUsers.find(u => u.role === userRole);
        if (user) {
            setEmail(user.email);
            setPassword('demo123');
            setRole(user.role as 'employee' | 'oh-professional' | 'manager');
        }
    };

    return (
        <div className="nhsuk-width-container">
            <main className="nhsuk-main-wrapper" id="main-content" role="main">
                <div className="nhsuk-grid-row">
                    <div className="nhsuk-grid-column-two-thirds">
                        <h1 className="nhsuk-heading-xl">Sign in to NHS EHR System</h1>
                        
                        <form onSubmit={handleSubmit} className="nhsuk-form">
                            <div className="nhsuk-form-group">
                                <label className="nhsuk-label" htmlFor="email">
                                    Email address
                                </label>
                                <div className="nhsuk-hint" id="email-hint">
                                    Enter the email address you use to access your account
                                </div>
                                <input
                                    className="nhsuk-input"
                                    id="email"
                                    name="email"
                                    type="email"
                                    spellCheck={false}
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-describedby="email-hint"
                                    required
                                />
                            </div>

                            <div className="nhsuk-form-group">
                                <label className="nhsuk-label" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="nhsuk-input"
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="nhsuk-form-group">
                                <label className="nhsuk-label" htmlFor="role">
                                    Login as
                                </label>
                                <select
                                    className="nhsuk-select"
                                    id="role"
                                    name="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value as 'employee' | 'oh-professional' | 'manager')}
                                >
                                    <option value="employee">Employee</option>
                                    <option value="oh-professional">OH Professional</option>
                                    <option value="manager">Manager</option>
                                </select>
                            </div>

                            <div className="nhsuk-checkboxes nhsuk-form-group">
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
                            </div>

                            <button
                                className="nhsuk-button"
                                data-module="nhsuk-button"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>

                            <p className="nhsuk-body">
                                <a className="nhsuk-link" href="#forgot-password">
                                    Forgot your password?
                                </a>
                            </p>
                        </form>
                    </div>

                    <div className="nhsuk-grid-column-one-third">
                        <div className="nhsuk-card">
                            <div className="nhsuk-card__content">
                                <h2 className="nhsuk-card__heading nhsuk-heading-m">
                                    Demo accounts
                                </h2>
                                <p className="nhsuk-card__description">
                                    Use these demo accounts to explore different user roles
                                </p>
                                
                                <div className="nhsuk-u-margin-bottom-4">
                                    {demoUsers.map((user, index) => (
                                        <div key={index} className="nhsuk-u-margin-bottom-3">
                                            <h3 className="nhsuk-heading-s nhsuk-u-margin-bottom-1">{user.name}</h3>
                                            <p className="nhsuk-body-s nhsuk-u-margin-bottom-2">{user.email}</p>
                                            <button
                                                type="button"
                                                className="nhsuk-button nhsuk-button--secondary"
                                                onClick={() => fillDemoUser(user.role)}
                                            >
                                                Use this account
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="nhsuk-inset-text">
                            <span className="nhsuk-u-visually-hidden">Information: </span>
                            <p>Need help? Contact IT Support for assistance with accessing your account.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginScreen;