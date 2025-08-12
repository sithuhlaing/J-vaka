import React, { useState } from 'react';
import { Search, Plus, FileText, AlertTriangle, CheckCircle, Clock, User, Briefcase, Calendar, Shield } from 'lucide-react';

interface Employee {
    id: string;
    employeeId: string;
    name: string;
    department: string;
    jobRole: string;
    hireDate: string;
    fitnessStatus: 'fit' | 'restricted' | 'unfit';
    lastAssessment: string;
    nextDue: string;
    exposures: string[];
    medicalSurveillance: string[];
}

const EmployeeHealthRecords = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    
    const employees: Employee[] = [
        {
            id: '1',
            employeeId: 'EMP001',
            name: 'John Smith',
            department: 'Production',
            jobRole: 'Machine Operator',
            hireDate: '2022-03-15',
            fitnessStatus: 'fit',
            lastAssessment: '2024-07-15',
            nextDue: '2025-07-15',
            exposures: ['Noise', 'Chemicals', 'Physical Demands'],
            medicalSurveillance: ['Annual Medical', 'Audiometry', 'Respirator Fit Test']
        },
        {
            id: '2',
            employeeId: 'EMP002',
            name: 'Sarah Wilson',
            department: 'Maintenance',
            jobRole: 'Maintenance Technician',
            hireDate: '2021-08-22',
            fitnessStatus: 'restricted',
            lastAssessment: '2024-06-10',
            nextDue: '2024-12-10',
            exposures: ['Heights', 'Electrical', 'Chemical'],
            medicalSurveillance: ['Bi-Annual Medical', 'Vision Test']
        },
        {
            id: '3',
            employeeId: 'EMP003',
            name: 'Mike Johnson',
            department: 'Warehouse',
            jobRole: 'Forklift Driver',
            hireDate: '2023-01-10',
            fitnessStatus: 'fit',
            lastAssessment: '2024-01-10',
            nextDue: '2025-01-10',
            exposures: ['Physical Demands', 'Vehicle Operation'],
            medicalSurveillance: ['Annual Medical', 'Vision Test', 'Drug Test']
        },
        {
            id: '4',
            employeeId: 'EMP004',
            name: 'Emily Davis',
            department: 'Quality Control',
            jobRole: 'QC Inspector',
            hireDate: '2022-11-05',
            fitnessStatus: 'fit',
            lastAssessment: '2024-05-20',
            nextDue: '2025-05-20',
            exposures: ['Chemical', 'Vision Demands'],
            medicalSurveillance: ['Annual Medical', 'Vision Test']
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'fit': return 'text-green-600 bg-green-100';
            case 'restricted': return 'text-yellow-600 bg-yellow-100';
            case 'unfit': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'fit': return <CheckCircle className="h-4 w-4" />;
            case 'restricted': return <AlertTriangle className="h-4 w-4" />;
            case 'unfit': return <AlertTriangle className="h-4 w-4" />;
            default: return <Clock className="h-4 w-4" />;
        }
    };

    const filteredEmployees = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedEmployee) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <button 
                        onClick={() => setSelectedEmployee(null)}
                        className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
                    >
                        ← Back to Employee List
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Edit Record
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{selectedEmployee.name}</h1>
                            <p className="text-gray-600">{selectedEmployee.employeeId} • {selectedEmployee.department}</p>
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedEmployee.fitnessStatus)}`}>
                                {getStatusIcon(selectedEmployee.fitnessStatus)}
                                <span className="capitalize">{selectedEmployee.fitnessStatus} for Work</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Employee Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                <Briefcase className="h-5 w-5" />
                                <span>Employee Information</span>
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Job Role</label>
                                    <p className="text-gray-900">{selectedEmployee.jobRole}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Department</label>
                                    <p className="text-gray-900">{selectedEmployee.department}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Hire Date</label>
                                    <p className="text-gray-900">{new Date(selectedEmployee.hireDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Health Assessment Status */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                <Calendar className="h-5 w-5" />
                                <span>Health Assessment Status</span>
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Assessment</label>
                                    <p className="text-gray-900">{new Date(selectedEmployee.lastAssessment).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Next Due</label>
                                    <p className="text-gray-900">{new Date(selectedEmployee.nextDue).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fitness Status</label>
                                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedEmployee.fitnessStatus)}`}>
                                        {getStatusIcon(selectedEmployee.fitnessStatus)}
                                        <span className="capitalize">{selectedEmployee.fitnessStatus} for Work</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Workplace Exposures */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                <Shield className="h-5 w-5" />
                                <span>Workplace Exposures</span>
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedEmployee.exposures.map((exposure, index) => (
                                    <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                                        {exposure}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Medical Surveillance */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                <FileText className="h-5 w-5" />
                                <span>Medical Surveillance</span>
                            </h3>
                            <div className="space-y-2">
                                {selectedEmployee.medicalSurveillance.map((surveillance, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <span className="text-gray-900">{surveillance}</span>
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex space-x-4">
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            Schedule Assessment
                        </button>
                        <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                            Generate Certificate
                        </button>
                        <button className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
                            View History
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Employee Health Records</h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Employee</span>
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, employee ID, or department..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Employee List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fitness Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Assessment</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Due</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredEmployees.map((employee) => (
                                <tr key={employee.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <User className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                                <div className="text-sm text-gray-500">{employee.employeeId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.jobRole}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.fitnessStatus)}`}>
                                            {getStatusIcon(employee.fitnessStatus)}
                                            <span className="capitalize">{employee.fitnessStatus}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(employee.lastAssessment).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(employee.nextDue).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button 
                                            onClick={() => setSelectedEmployee(employee)}
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                        >
                                            View
                                        </button>
                                        <button className="text-green-600 hover:text-green-900">
                                            Assess
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-500">Fit for Work</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {employees.filter(e => e.fitnessStatus === 'fit').length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-500">Restricted</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {employees.filter(e => e.fitnessStatus === 'restricted').length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-500">Unfit</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {employees.filter(e => e.fitnessStatus === 'unfit').length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-500">Due Soon</p>
                            <p className="text-lg font-semibold text-gray-900">2</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeHealthRecords;