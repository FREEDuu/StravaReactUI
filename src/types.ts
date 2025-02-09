interface Activity {
    id: number;
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    type: string;
    sport_type: string;
    start_date: string;
    start_date_local: string;
    timezone: string;
    kudos_count: number;
    athlete_count: number;
    average_speed: number;
  }  
  
interface ChartDataPoint {
    date: string;
    elevation: number;
    distance: number;
 }

interface ContributionData {
    [date: string]: { level: number; [key: string]: any } | { level: number };
  }


interface CumulativeChartDataPoint {
    date: string;
    year: string;  // Add year property
    cumulative_distance: number;
    cumulative_elevation_gain: number;
}

interface CumulativeChartData {
    years: {  // Explicitly define the 'years' property
        [year: string]: {
            [date: string]: {
                cumulative_distance: number;
                cumulative_elevation_gain: number;
            };
        };
    };
}