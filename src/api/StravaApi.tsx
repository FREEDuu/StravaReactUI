const API_BASE_URL = "http://stravawebapp-fastapi-u8bwo9-877f67-135-181-151-206.traefik.me"; // Base URL


export const fetchCumulativeChartData = async (runner_username: string, runner_access: string, num_years: number = 2): Promise<CumulativeChartDataPoint[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/cumulative_chart/${runner_username}/${runner_access}/${num_years}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: CumulativeChartData = await response.json();
        console.log("dati cumulativi",data)
        const chartDataPoints: CumulativeChartDataPoint[] = [];

        for (const year in data.years) {
            const yearData = data.years[year]; // Store the inner object
        
            if (yearData) { // Check if yearData exists
                for (const date in yearData) {
                    const dailyData = yearData[date] as { cumulative_distance: number; cumulative_elevation_gain: number }; // Type assertion
        
                    chartDataPoints.push({
                        year: year,
                        date: date,
                        cumulative_distance: dailyData.cumulative_distance,
                        cumulative_elevation_gain: dailyData.cumulative_elevation_gain,
                    });
                }
            }
        }
        console.log("dati cumulativi",chartDataPoints)

        return chartDataPoints;

    } catch (error) {
        console.error("Error fetching cumulative chart data:", error);
        return [];
    }
};

export const fetchGHChartData = async (username: string, access_token: string): Promise<ContributionData[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/gh_chart/${username}/${access_token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ start_date: "2024-01-01", end_date: "2024-12-31" }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return Object.entries(data.data || {}).map(([date, value]) => ({
            [date]: value as { level: number; [key: string]: any } | { level: number },
        }));

    } catch (error) {
        console.error("Error fetching GH chart data:", error);
        return []; // Return empty array on error
    }
};

export const fetchActivitiesData = async (username: string, access_token: string): Promise<ChartDataPoint[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth_runner_activities_between/${username}/${access_token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ start_date: "2024-01-01", end_date: "2024-12-31" }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const activities: Activity[] = await response.json();
        return activities.map(activity => ({
            date: activity.start_date_local.split('T')[0],
            elevation: activity.total_elevation_gain,
            distance: activity.distance,
        }));

    } catch (error) {
        console.error("Error fetching activities data:", error);
        return []; // Return empty array on error
    }
};