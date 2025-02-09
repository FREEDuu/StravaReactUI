import React from 'react';

interface Activity {
    id: number;
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    // ... other properties
}

const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {

    const formatDistance = (distance: number): string => {
        const km = distance / 1000;
        return `${km.toFixed(2)} km`;
    };

    const formatElevation = (elevation: number): string => {
        return `${elevation} m`;
    };

    const formatTime = (time: number): string => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 m-2"> {/* Card Styling */}
            <h3 className="text-lg font-semibold mb-2">{activity.name}</h3> {/* Activity Title */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600">Distance: {formatDistance(activity.distance)}</p>
                    <p className="text-gray-600">Elevation: {formatElevation(activity.total_elevation_gain)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Time: {formatTime(activity.moving_time)}</p>
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;