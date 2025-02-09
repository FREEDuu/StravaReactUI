// Linechart.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ChartDataPoint {  // Must match the interface in Home.tsx
    date: string;
    elevation: number;
    distance: number;
}

function Linechart({ dataLineChart }: { dataLineChart: ChartDataPoint[] }) {
    return (
        <LineChart width={1000} height={300} data={dataLineChart} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" /> {/* Use the 'date' property */}
            <YAxis yAxisId="left" /> {/* Use separate YAxis for elevation */}
            <YAxis yAxisId="right" orientation="right" /> {/* Use separate YAxis for distance */}
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="elevation" stroke="#8884d8" yAxisId="left" /> {/* Elevation line */}
            <Line type="monotone" dataKey="distance" stroke="#82ca9c" yAxisId="right" /> {/* Distance line */}
        </LineChart>
    );
}

export default Linechart;