import React, { useState } from 'react';

interface LoginScreenProps {
    onLogin: (email: string, password: string, role: 'employee' | 'oh_professional' | 'manager') => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: '' as 'employee' | 'oh_professional' | 'manager' | '',
        remember: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (!formData.email || !formData.password || !formData.role) {
                throw new Error('Please fill in all required fields');
            }
            
            onLogin(formData.email, formData.password, formData.role);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="nhsuk-template">
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    {/* Header Component */}
                    <div className="text-center mb-8">
                        <img 
                            src="/nhs-logo.svg" 
                            alt="NHS Logo" 
                            className="mx-auto h-10 w-30 mb-4"
                            style={{ width: '120px', height: '40px' }}
                        />
                        <h1 className="text-3xl font-bold text-gray-900">
                            OH eHR System
                        </h1>
                    </div>
                    
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {/* Form Component */}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="nhsuk-error-message">
                                    <span className="nhsuk-u-visually-hidden">Error:</span>
                                    {error}
                                </div>
                            )}
                            
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="nhsuk-label">
                                    NHS Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="nhsuk-input"
                                    placeholder="NHS Email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="nhsuk-label">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="nhsuk-input"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                />
                            </div>

                            {/* Role Select */}
                            <div>
                                <label htmlFor="role" className="nhsuk-label">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    required
                                    className="nhsuk-select"
                                    value={formData.role}
                                    onChange={(e) => handleInputChange('role', e.target.value)}
                                >
                                    <option value="">Select your role</option>
                                    <option value="employee">Employee</option>
                                    <option value="oh_professional">OH Professional</option>
                                    <option value="manager">Manager</option>
                                </select>
                            </div>

                            {/* Remember Me Checkbox */}
                            <div className="nhsuk-checkboxes">
                                <div className="nhsuk-checkboxes__item">
                                    <input
                                        className="nhsuk-checkboxes__input"
                                        id="remember"
                                        name="remember"
                                        type="checkbox"
                                        checked={formData.remember}
                                        onChange={(e) => handleInputChange('remember', e.target.checked)}
                                    />
                                    <label className="nhsuk-label nhsuk-checkboxes__label" htmlFor="remember">
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="nhsuk-button nhsuk-button--primary w-full"
                                >
                                    {isLoading ? 'Signing In...' : 'Sign In'}
                                </button>
                            </div>
                        </form>

                        {/* Links Component */}
                        <div className="mt-6 space-y-2 text-center">
                            <div>
                                <a 
                                    href="/forgot-password" 
                                    className="nhsuk-link"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <div>
                                <a 
                                    href="/help" 
                                    className="nhsuk-link"
                                >
                                    Need help?
                                </a>
                            </div>
                        </div>

                        {/* Demo Users for Development */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Users:</h3>
                            <div className="space-y-1 text-xs text-blue-700">
                                <div>Employee: john.smith@nhs.uk / password123</div>
                                <div>OH Professional: dr.johnson@nhs.uk / password123</div>
                                <div>Manager: manager@nhs.uk / password123</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;