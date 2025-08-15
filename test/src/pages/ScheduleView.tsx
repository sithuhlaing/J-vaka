import React from 'react';

const ScheduleView = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const timeSlots = [];
    for (let i = 8; i <= 17; i++) {
        timeSlots.push(`${i}:00 AM`);
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Weekly Schedule</h1>
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 border rounded-lg hover:bg-gray-200">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <span className="font-semibold">October 23-27, 2023</span>
                    <button className="px-3 py-1 border rounded-lg hover:bg-gray-200">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg relative" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr 1fr', 
                gridTemplateRows: `auto repeat(${timeSlots.length}, 60px)` 
            }}>
                <div className="border-r border-b"></div>
                {days.map(day => 
                    <div key={day} className="text-center font-bold p-2 border-b border-r">{day}</div>
                )}

                {timeSlots.map((time, index) => (
                    <React.Fragment key={time}>
                        <div className="p-2 border-r text-right text-xs text-gray-500">{time}</div>
                        {days.map((day) => (
                            <div key={`${day}-${time}`} className={`border-r ${index < timeSlots.length - 1 ? 'border-b' : ''}`}>
                            </div>
                        ))}
                    </React.Fragment>
                ))}

                <div className="absolute bg-blue-200 border border-blue-400 rounded-lg p-1 text-xs" 
                     style={{ top: '160px', left: '210px', width: '150px' }}>
                    <strong>9:00 - Sarah Jones</strong><br />Annual Physical
                </div>
                <div className="absolute bg-green-200 border border-green-400 rounded-lg p-1 text-xs" 
                     style={{ top: '220px', left: '370px', width: '150px' }}>
                    <strong>10:00 - David Lee</strong><br />Follow-Up
                </div>
                <div className="absolute bg-purple-200 border border-purple-400 rounded-lg p-1 text-xs" 
                     style={{ top: '160px', left: '530px', width: '150px' }}>
                    <strong>9:00 - Robert Miller</strong><br />New Patient
                </div>
            </div>
        </div>
    );
};

export default ScheduleView;