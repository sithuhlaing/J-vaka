import React, { useState } from 'react';
import { Save, Printer, CheckCircle, AlertTriangle, Clock, User, FileText, Shield } from 'lucide-react';

interface AssessmentData {
    employeeId: string;
    employeeName: string;
    assessmentType: string;
    date: string;
    vitalSigns: {
        bloodPressure: string;
        heartRate: string;
        weight: string;
        height: string;
        temperature: string;
    };
    medicalHistory: {
        chronicConditions: string[];
        medications: string[];
        allergies: string[];
        previousInjuries: string[];
    };
    physicalExam: {
        vision: string;
        hearing: string;
        respiratory: string;
        musculoskeletal: string;
        neurological: string;
    };
    fitnessRecommendation: 'fit' | 'restricted' | 'unfit';
    restrictions: string[];
    nextAssessmentDate: string;
    notes: string;
}

const OccupationalAssessment = () => {
    const [assessmentData, setAssessmentData] = useState<AssessmentData>({
        employeeId: 'EMP001',
        employeeName: 'John Smith',
        assessmentType: 'annual',
        date: new Date().toISOString().split('T')[0],
        vitalSigns: {
            bloodPressure: '',
            heartRate: '',
            weight: '',
            height: '',
            temperature: ''
        },
        medicalHistory: {
            chronicConditions: [],
            medications: [],
            allergies: [],
            previousInjuries: []
        },
        physicalExam: {
            vision: '',
            hearing: '',
            respiratory: '',
            musculoskeletal: '',
            neurological: ''
        },
        fitnessRecommendation: 'fit',
        restrictions: [],
        nextAssessmentDate: '',
        notes: ''
    });

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

    const assessmentTypes = [
        { value: 'pre-employment', label: 'Pre-Employment Medical' },
        { value: 'annual', label: 'Annual Health Check' },
        { value: 'return-to-work', label: 'Return to Work Assessment' },
        { value: 'fitness-for-duty', label: 'Fitness for Duty' },
        { value: 'surveillance', label: 'Health Surveillance' }
    ];

    const commonConditions = [
        'Hypertension', 'Diabetes', 'Asthma', 'Heart Disease', 'Back Problems', 
        'Arthritis', 'Depression', 'Anxiety', 'Hearing Loss', 'Vision Problems'
    ];

    const commonRestrictions = [
        'No Heavy Lifting (>20kg)', 'No Overhead Work', 'No Confined Spaces', 
        'No Chemical Exposure', 'No Night Shifts', 'Frequent Breaks Required',
        'No Prolonged Standing', 'No Driving', 'Hearing Protection Required'
    ];

    const updateVitalSigns = (field: keyof AssessmentData['vitalSigns'], value: string) => {
        setAssessmentData(prev => ({
            ...prev,
            vitalSigns: { ...prev.vitalSigns, [field]: value }
        }));
    };

    const updatePhysicalExam = (field: keyof AssessmentData['physicalExam'], value: string) => {
        setAssessmentData(prev => ({
            ...prev,
            physicalExam: { ...prev.physicalExam, [field]: value }
        }));
    };

    const toggleCondition = (condition: string) => {
        setAssessmentData(prev => ({
            ...prev,
            medicalHistory: {
                ...prev.medicalHistory,
                chronicConditions: prev.medicalHistory.chronicConditions.includes(condition)
                    ? prev.medicalHistory.chronicConditions.filter(c => c !== condition)
                    : [...prev.medicalHistory.chronicConditions, condition]
            }
        }));
    };

    const toggleRestriction = (restriction: string) => {
        setAssessmentData(prev => ({
            ...prev,
            restrictions: prev.restrictions.includes(restriction)
                ? prev.restrictions.filter(r => r !== restriction)
                : [...prev.restrictions, restriction]
        }));
    };

    const getStepTitle = (step: number) => {
        switch (step) {
            case 1: return 'Basic Information';
            case 2: return 'Vital Signs';
            case 3: return 'Medical History';
            case 4: return 'Physical Examination';
            case 5: return 'Assessment & Recommendations';
            default: return '';
        }
    };

    const renderStepIndicator = () => (
        <div className="mb-8">
            <div className="flex justify-between items-center">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
                    <div key={step} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            step <= currentStep 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-200 text-gray-400'
                        }`}>
                            {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                        </div>
                        {step < totalSteps && (
                            <div className={`h-1 w-full mx-2 ${
                                step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                            }`} />
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-2 text-center">
                <h2 className="text-lg font-semibold text-gray-900">{getStepTitle(currentStep)}</h2>
            </div>
        </div>
    );

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                    <input
                        type="text"
                        value={assessmentData.employeeId}
                        onChange={(e) => setAssessmentData(prev => ({ ...prev, employeeId: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
                    <input
                        type="text"
                        value={assessmentData.employeeName}
                        onChange={(e) => setAssessmentData(prev => ({ ...prev, employeeName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Type</label>
                    <select
                        value={assessmentData.assessmentType}
                        onChange={(e) => setAssessmentData(prev => ({ ...prev, assessmentType: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {assessmentTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Date</label>
                    <input
                        type="date"
                        value={assessmentData.date}
                        onChange={(e) => setAssessmentData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Vital Signs</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure (mmHg)</label>
                    <input
                        type="text"
                        placeholder="120/80"
                        value={assessmentData.vitalSigns.bloodPressure}
                        onChange={(e) => updateVitalSigns('bloodPressure', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Heart Rate (bpm)</label>
                    <input
                        type="number"
                        placeholder="72"
                        value={assessmentData.vitalSigns.heartRate}
                        onChange={(e) => updateVitalSigns('heartRate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                    <input
                        type="number"
                        placeholder="70"
                        value={assessmentData.vitalSigns.weight}
                        onChange={(e) => updateVitalSigns('weight', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                    <input
                        type="number"
                        placeholder="175"
                        value={assessmentData.vitalSigns.height}
                        onChange={(e) => updateVitalSigns('height', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°C)</label>
                    <input
                        type="number"
                        step="0.1"
                        placeholder="36.5"
                        value={assessmentData.vitalSigns.temperature}
                        onChange={(e) => updateVitalSigns('temperature', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Medical History</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Chronic Conditions</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {commonConditions.map(condition => (
                        <label key={condition} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={assessmentData.medicalHistory.chronicConditions.includes(condition)}
                                onChange={() => toggleCondition(condition)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{condition}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
                <textarea
                    rows={3}
                    placeholder="List current medications..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Known Allergies</label>
                <textarea
                    rows={2}
                    placeholder="List known allergies..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Physical Examination</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vision</label>
                    <select
                        value={assessmentData.physicalExam.vision}
                        onChange={(e) => updatePhysicalExam('vision', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select result</option>
                        <option value="normal">Normal</option>
                        <option value="correctable">Correctable with glasses</option>
                        <option value="impaired">Impaired</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hearing</label>
                    <select
                        value={assessmentData.physicalExam.hearing}
                        onChange={(e) => updatePhysicalExam('hearing', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select result</option>
                        <option value="normal">Normal</option>
                        <option value="mild-loss">Mild hearing loss</option>
                        <option value="significant-loss">Significant hearing loss</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Respiratory</label>
                    <select
                        value={assessmentData.physicalExam.respiratory}
                        onChange={(e) => updatePhysicalExam('respiratory', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select result</option>
                        <option value="normal">Normal</option>
                        <option value="reduced">Reduced capacity</option>
                        <option value="abnormal">Abnormal findings</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Musculoskeletal</label>
                    <select
                        value={assessmentData.physicalExam.musculoskeletal}
                        onChange={(e) => updatePhysicalExam('musculoskeletal', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select result</option>
                        <option value="normal">Normal</option>
                        <option value="limitations">Some limitations</option>
                        <option value="significant">Significant limitations</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderStep5 = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Assessment & Recommendations</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Fitness for Work Recommendation</label>
                <div className="flex space-x-6">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="fitness"
                            value="fit"
                            checked={assessmentData.fitnessRecommendation === 'fit'}
                            onChange={(e) => setAssessmentData(prev => ({ ...prev, fitnessRecommendation: e.target.value as 'fit' | 'restricted' | 'unfit' }))}
                            className="text-blue-600 focus:ring-blue-500"
                        />
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-600 font-medium">Fit for Work</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="fitness"
                            value="restricted"
                            checked={assessmentData.fitnessRecommendation === 'restricted'}
                            onChange={(e) => setAssessmentData(prev => ({ ...prev, fitnessRecommendation: e.target.value as 'fit' | 'restricted' | 'unfit' }))}
                            className="text-blue-600 focus:ring-blue-500"
                        />
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="text-yellow-600 font-medium">Fit with Restrictions</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="fitness"
                            value="unfit"
                            checked={assessmentData.fitnessRecommendation === 'unfit'}
                            onChange={(e) => setAssessmentData(prev => ({ ...prev, fitnessRecommendation: e.target.value as 'fit' | 'restricted' | 'unfit' }))}
                            className="text-blue-600 focus:ring-blue-500"
                        />
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-red-600 font-medium">Unfit for Work</span>
                    </label>
                </div>
            </div>

            {assessmentData.fitnessRecommendation === 'restricted' && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Work Restrictions</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {commonRestrictions.map(restriction => (
                            <label key={restriction} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={assessmentData.restrictions.includes(restriction)}
                                    onChange={() => toggleRestriction(restriction)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{restriction}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Next Assessment Date</label>
                <input
                    type="date"
                    value={assessmentData.nextAssessmentDate}
                    onChange={(e) => setAssessmentData(prev => ({ ...prev, nextAssessmentDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                    rows={4}
                    value={assessmentData.notes}
                    onChange={(e) => setAssessmentData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional clinical notes, recommendations, or observations..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1: return renderStep1();
            case 2: return renderStep2();
            case 3: return renderStep3();
            case 4: return renderStep4();
            case 5: return renderStep5();
            default: return null;
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                        <FileText className="h-6 w-6" />
                        <span>Occupational Health Assessment</span>
                    </h1>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center space-x-2">
                            <Printer className="h-4 w-4" />
                            <span>Print</span>
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                            <Save className="h-4 w-4" />
                            <span>Save Draft</span>
                        </button>
                    </div>
                </div>

                {renderStepIndicator()}

                <div className="min-h-[400px] mb-8">
                    {renderCurrentStep()}
                </div>

                <div className="flex justify-between">
                    <button 
                        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                        disabled={currentStep === 1}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    
                    {currentStep < totalSteps ? (
                        <button 
                            onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Next
                        </button>
                    ) : (
                        <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>Complete Assessment</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OccupationalAssessment;