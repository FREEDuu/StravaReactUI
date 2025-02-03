import ContributionGraph from "../components/ContributionGraph"
import Linechart from "../components/Linechart";
import { ResponsiveContainer } from "recharts";
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const dataLineChart = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
const dataGHchart = [
  {
    '2022-07-08': { level: 1 },
  },    
  {
    '2022-05-08': { level: 2 },
  },    
  {
    '2022-04-08': { level: 3 },
  },
    {
      '2022-07-09': { level: 4, data: {} },
    },
    {
      '2022-03-31': {
        level: 3,
        data: {
          myKey: 'my data',
        },
      },
    },
  ]

  function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const handleAuthRedirect = useAuthStore((state: any) => state.handleAuthRedirect);
    const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
    //useAuthStore((state: any) => state.logAuthInfo()); // Log user info
  
    // Catch URL code from previous redirect from Strava, if present.
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');
      console.log(localStorage)
      if (code && !isAuthenticated) {
        handleAuthRedirect(code)
          .then(() => {
            // Remove the code from the URL to prevent infinite redirects loop
            navigate('/home', { replace: true });
          })
          .catch(() => {
            navigate('/login', { replace: true });
          });
      } else if (!isAuthenticated) {
        // If no code and not authenticated, redirect to login
        navigate('/login', { replace: true });
      }
    }, [handleAuthRedirect, navigate, location, isAuthenticated]);
  
    if (!isAuthenticated) {
      return <div>Redirecting...</div>;
    }

  return (
    <div className="h-100">
        <ContributionGraph dataGHchart={dataGHchart} ></ContributionGraph>
        <ResponsiveContainer>
        <Linechart dataLineChart={dataLineChart}></Linechart>
        </ResponsiveContainer>
    </div>

  )
}

export default Home


  