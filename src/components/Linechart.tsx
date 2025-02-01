import { LineChart, Line } from 'recharts';

function Linechart({dataLineChart} : any) {
  return (
    <div>
        <LineChart width={400} height={400} data={dataLineChart}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
    </div>
  )
}

export default Linechart