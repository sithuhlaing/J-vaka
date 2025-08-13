import React, { useState } from 'react';
import { MapPin, Video, Phone, Building, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { AppScreen } from '../contexts/NavigationContext';

type AppointmentType = 'health_check' | 'consultation' | 'follow_up' | 'emergency';
type AppointmentMode = 'in_person' | 'video' | 'phone';

interface AppointmentData {
    type: AppointmentType | '';
    date: string;
    time: string;
    mode: AppointmentMode | '';
    reason?: string;
    emailReminder: boolean;
    smsReminder: boolean;
}

interface BookAppointmentProps {
    onNavigate: (screen: AppScreen, data?: any) => void;
}

const BookAppointment: React.FC<BookAppointmentProps> = ({ onNavigate }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [appointmentData, setAppointmentData] = useState<AppointmentData>({
        type: '',
        date: '',
        time: '',
        mode: '',
        reason: '',
        emailReminder: true,
        smsReminder: false
    });

    const appointmentTypes = [
        { 
            value: 'health_check', 
            label: 'Health Check-up', 
            description: 'Regular health assessment',
            icon: '🏥'
        },
        { 
            value: 'consultation', 
            label: 'Consultation', 
            description: 'Discuss specific health concern',
            icon: '💬'
        },
        { 
            value: 'follow_up', 
            label: 'Follow-up', 
            description: 'Follow-up from previous appointment',
            icon: '📋'
        },
        { 
            value: 'emergency', 
            label: 'Urgent Consultation', 
            description: 'Urgent health matter',
            icon: '🚨'
        }
    ];

    const modeOptions = [
        { 
            value: 'in_person', 
            label: 'In-Person', 
            description: 'Visit the health center',
            icon: Building
        },
        { 
            value: 'video', 
            label: 'Video Call', 
            description: 'Online video consultation',
            icon: Video
        },
        { 
            value: 'phone', 
            label: 'Phone Call', 
            description: 'Audio consultation',
            icon: Phone
        }
    ];

    // Mock time slots
    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            // Simulate API call
            console.log('Booking appointment:', appointmentData);
            
            // Show success message
            alert('Appointment booked successfully!');
            
            // Navigate back to dashboard
            onNavigate('dashboard');
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Booking failed. Please try again.');
        }
    };

    const updateAppointmentData = (field: keyof AppointmentData, value: any) => {
        setAppointmentData(prev => ({ ...prev, [field]: value }));
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: // Type Selection
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Appointment Type</h2>
                            <p className="text-gray-600 mt-2">What type of appointment do you need?</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {appointmentTypes.map((type) => (
                                <div
                                    key={type.value}
                                    className={`p-6 border rounded-lg cursor-pointer transition-colors ${
                                        appointmentData.type === type.value
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    onClick={() => updateAppointmentData('type', type.value)}
                                >
                                    <div className="flex items-start space-x-4">
                                        <span className="text-2xl">{type.icon}</span>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{type.label}</h3>
                                            <p className="text-gray-600 text-sm mt-1">{type.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 2: // Date & Time Selection
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Date & Time</h2>
                            <p className="text-gray-600 mt-2">Select your preferred date and time</p>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Calendar */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-4">Available Dates</h3>
                                <input
                                    type="date"
                                    className="nhsuk-input w-full"
                                    min={new Date().toISOString().split('T')[0]}
                                    max={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                                    value={appointmentData.date}
                                    onChange={(e) => updateAppointmentData('date', e.target.value)}
                                />
                            </div>
                            
                            {/* Time Slots */}
                            {appointmentData.date && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-4">Available Times</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {timeSlots.map((time) => (
                                            <button
                                                key={time}
                                                className={`p-2 text-sm border rounded transition-colors ${
                                                    appointmentData.time === time
                                                        ? 'border-blue-500 bg-blue-500 text-white'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                                onClick={() => updateAppointmentData('time', time)}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 3: // Mode Selection
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Appointment Mode</h2>
                            <p className="text-gray-600 mt-2">How would you like to attend your appointment?</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {modeOptions.map((mode) => (
                                <div
                                    key={mode.value}
                                    className={`p-6 border rounded-lg cursor-pointer transition-colors ${
                                        appointmentData.mode === mode.value
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    onClick={() => updateAppointmentData('mode', mode.value)}
                                >
                                    <div className="text-center">
                                        <mode.icon className="h-8 w-8 mx-auto mb-4 text-gray-600" />
                                        <h3 className="font-semibold text-gray-900">{mode.label}</h3>
                                        <p className="text-gray-600 text-sm mt-2">{mode.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {appointmentData.mode === 'in_person' && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <div className="flex items-start space-x-3">
                                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-blue-900">Health Centre Location</h4>
                                        <p className="text-blue-700 text-sm">
                                            NHS Occupational Health Centre<br />
                                            123 Healthcare Street<br />
                                            London, SW1A 1AA
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 4: // Confirmation
                const selectedType = appointmentTypes.find(t => t.value === appointmentData.type);
                const selectedMode = modeOptions.find(m => m.value === appointmentData.mode);
                
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Confirmation</h2>
                            <p className="text-gray-600 mt-2">Please review your appointment details</p>
                        </div>
                        
                        {/* Summary Card */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <CheckCircle className="h-6 w-6 text-green-500" />
                                <h3 className="text-lg font-semibold">Appointment Summary</h3>
                            </div>
                            
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Type:</span>
                                    <span className="font-medium">{selectedType?.label}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Date:</span>
                                    <span className="font-medium">
                                        {new Date(appointmentData.date).toLocaleDateString('en-GB', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Time:</span>
                                    <span className="font-medium">{appointmentData.time}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Mode:</span>
                                    <span className="font-medium">{selectedMode?.label}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Professional:</span>
                                    <span className="font-medium">Dr. Sarah Johnson</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Reason for Appointment */}
                        <div>
                            <label className="nhsuk-label" htmlFor="reason">
                                Reason for appointment (optional)
                            </label>
                            <textarea
                                id="reason"
                                className="nhsuk-textarea"
                                placeholder="Please describe your concern or reason for this appointment"
                                rows={3}
                                value={appointmentData.reason}
                                onChange={(e) => updateAppointmentData('reason', e.target.value)}
                            />
                        </div>
                        
                        {/* Reminder Preferences */}
                        <div className="nhsuk-checkboxes">
                            <div className="nhsuk-checkboxes__item">
                                <input
                                    className="nhsuk-checkboxes__input"
                                    id="email-reminder"
                                    type="checkbox"
                                    checked={appointmentData.emailReminder}
                                    onChange={(e) => updateAppointmentData('emailReminder', e.target.checked)}
                                />
                                <label className="nhsuk-label nhsuk-checkboxes__label" htmlFor="email-reminder">
                                    Send email reminder
                                </label>
                            </div>
                            <div className="nhsuk-checkboxes__item">
                                <input
                                    className="nhsuk-checkboxes__input"
                                    id="sms-reminder"
                                    type="checkbox"
                                    checked={appointmentData.smsReminder}
                                    onChange={(e) => updateAppointmentData('smsReminder', e.target.checked)}
                                />
                                <label className="nhsuk-label nhsuk-checkboxes__label" htmlFor="sms-reminder">
                                    Send SMS reminder
                                </label>
                            </div>
                        </div>
                    </div>
                );
                
            default:
                return null;
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1: return appointmentData.type !== '';
            case 2: return appointmentData.date !== '' && appointmentData.time !== '';
            case 3: return appointmentData.mode !== '';
            case 4: return true;
            default: return false;
        }
    };

    return (
        <div className="responsive-container min-h-full">
            <div className="max-w-4xl mx-auto p-6">
                {/* Breadcrumb */}
                <nav className="mb-6">
                    <ol className="flex items-center space-x-2 text-sm text-gray-600">
                        <li><button onClick={() => onNavigate('dashboard')} className="hover:text-gray-900">Dashboard</button></li>
                        <li>/</li>
                        <li className="text-gray-900">Book Appointment</li>
                    </ol>
                </nav>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                        step <= currentStep
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                    }`}
                                >
                                    {step}
                                </div>
                                {step < 4 && (
                                    <div
                                        className={`w-20 h-1 mx-2 ${
                                            step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600">
                        <span>Type</span>
                        <span>Date & Time</span>
                        <span>Mode</span>
                        <span>Confirm</span>
                    </div>
                </div>

                {/* Step Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
                    {renderStepContent()}
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                            currentStep === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                    </button>

                    {currentStep < 4 ? (
                        <button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                                canProceed()
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <span>Next</span>
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="nhsuk-button nhsuk-button--primary"
                        >
                            Book Appointment
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;