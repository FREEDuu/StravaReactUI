import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface CumulativeChartDataPoint { // Must match the interface in Home.tsx
    date: string;
    year: string;
    cumulative_distance: number;
    cumulative_elevation_gain: number;
}

function CumulativeChart({ dataLineChart }: { dataLineChart: CumulativeChartDataPoint[] }) {
    return (
        <LineChart  width={1000} height={300} data={dataLineChart} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cumulative_distance" stroke="#8884d8" yAxisId="left" />
            <Line type="monotone" dataKey="cumulative_elevation_gain" stroke="#82ca9c" yAxisId="right" />
        </LineChart>
    );
}

export default CumulativeChart;