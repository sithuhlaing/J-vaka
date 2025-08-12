import React from 'react';

interface InfoCardProps {
    title: string;
    children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">{title}</h3>
            <div className="text-sm text-gray-600 space-y-2">{children}</div>
        </div>
    );
};

export default InfoCard;