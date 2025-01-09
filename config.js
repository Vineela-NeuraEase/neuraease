// config.js
const BACKEND_URL = 'http://localhost:3000'; // Change this to your backend URL

export const fetchUserLogs = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/user-logs`);
        return response.json();
    } catch (error) {
        console.error('Error fetching logs:', error);
        throw error;
    }
};

export const submitUserLog = async (logData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/user-logs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logData),
        });
        return response.json();
    } catch (error) {
        console.error('Error submitting log:', error);
        throw error;
    }
};

export const submitMeltdownEvent = async (eventData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/meltdown-events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });
        return response.json();
    } catch (error) {
        console.error('Error submitting meltdown event:', error);
        throw error;
    }
};

export const fetchSensorData = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/sensor-data`);
        return response.json();
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        throw error;
    }
};