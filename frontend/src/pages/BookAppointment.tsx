import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BookAppointment = () => {
    const [selectedDate, setSelectedDate] = useState<number | null>(15);
    const [selectedTime, setSelectedTime] = useState<string | null>("02:00 PM");
    const [appointmentType, setAppointmentType] = useState('');
    const [appointmentMode, setAppointmentMode] = useState('in-person');

    const availableTimes = [
        { time: "09:00 AM", available: true },
        { time: "10:30 AM", available: true },
        { time: "02:00 PM", available: true, selected: true },
        { time: "03:30 PM", available: true },
        { time: "04:00 PM", available: true },
    ];

    const calendarDays = [
        { day: 26, disabled: true },
        { day: 27, disabled: true },
        { day: 28, disabled: true },
        { day: 29, disabled: true },
        { day: 1, available: true },
        { day: 2, available: true },
        { day: 3, available: false },
        { day: 4, available: false },
        { day: 5, available: true },
        { day: 6, available: true },
        { day: 7, available: true },
        { day: 8, available: true },
        { day: 9, booked: true },
        { day: 10, available: false },
        { day: 11, available: false },
        { day: 12, available: true },
        { day: 13, available: true },
        { day: 14, available: true },
        { day: 15, available: true, selected: true },
        { day: 16, booked: true },
        { day: 17, available: false },
    ];

    return (
        <div className="p-6">
            <div className="bg-white border border-gray-200 rounded-lg mb-6 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Book New Appointment</h2>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
                        ← Back to Dashboard
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Appointment Form */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Appointment Details</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Appointment Type
                            </label>
                            <select 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={appointmentType}
                                onChange={(e) => setAppointmentType(e.target.value)}
                            >
                                <option value="">Select appointment type...</option>
                                <option value="annual">Annual Health Check</option>
                                <option value="consultation">Health Consultation</option>
                                <option value="followup">Follow-up Appointment</option>
                                <option value="assessment">Occupational Health Assessment</option>
                                <option value="return">Return to Work Assessment</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Preferred OH Professional
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Any available professional</option>
                                <option>Dr. Sarah Johnson - Occupational Physician</option>
                                <option>Jane Mitchell - OH Nurse</option>
                                <option>Dr. Michael Brown - Specialist</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Appointment Mode
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="mode"
                                        value="in-person"
                                        checked={appointmentMode === 'in-person'}
                                        onChange={(e) => setAppointmentMode(e.target.value)}
                                        className="mr-2"
                                    />
                                    In-Person
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="mode"
                                        value="video"
                                        checked={appointmentMode === 'video'}
                                        onChange={(e) => setAppointmentMode(e.target.value)}
                                        className="mr-2"
                                    />
                                    Video Call
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="mode"
                                        value="phone"
                                        checked={appointmentMode === 'phone'}
                                        onChange={(e) => setAppointmentMode(e.target.value)}
                                        className="mr-2"
                                    />
                                    Phone Call
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Reason for Visit (Optional)
                            </label>
                            <textarea
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Please describe the reason for your appointment..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                I would like to receive SMS reminders
                            </label>
                        </div>
                    </div>
                </div>

                {/* Calendar */}
                <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Select Date & Time</h3>
                    </div>
                    <div className="p-6">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-6">
                            <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <h4 className="text-lg font-semibold">March 2024</h4>
                            <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2 mb-6">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="text-center font-semibold text-gray-600 py-2">
                                    {day}
                                </div>
                            ))}
                            {calendarDays.map((day, index) => (
                                <button
                                    key={index}
                                    onClick={() => day.available && setSelectedDate(day.day)}
                                    disabled={day.disabled || day.booked || !day.available}
                                    className={`
                                        text-center py-3 rounded border transition-colors
                                        ${day.disabled ? 'text-gray-400 cursor-not-allowed' : ''}
                                        ${day.booked ? 'bg-red-100 text-red-600 cursor-not-allowed' : ''}
                                        ${day.available && !day.selected ? 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer' : ''}
                                        ${day.selected ? 'bg-blue-600 text-white' : ''}
                                        ${!day.available && !day.disabled && !day.booked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
                                    `}
                                >
                                    {day.day}
                                </button>
                            ))}
                        </div>

                        {/* Available Times */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold mb-4">Available Times for March 15</h4>
                            <div className="grid grid-cols-3 gap-3">
                                {availableTimes.map((slot, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedTime(slot.time)}
                                        className={`
                                            px-4 py-3 rounded-md font-medium transition-colors
                                            ${selectedTime === slot.time
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-500 text-white hover:bg-gray-600'
                                            }
                                        `}
                                    >
                                        {slot.time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Confirm Button */}
                        <div className="text-center">
                            <button className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-lg font-semibold">
                                Confirm Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;