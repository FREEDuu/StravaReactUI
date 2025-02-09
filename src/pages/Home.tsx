import ContributionGraph from "../components/ContributionGraph";
import Linechart from "../components/Linechart";
import { ResponsiveContainer } from "recharts";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
import { fetchGHChartData, fetchActivitiesData, fetchCumulativeChartData } from "@/api/StravaApi";
import CumulativeChart from "@/components/Cumulative";

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const user = useAuthStore((state: any) => state.user);
  const [dataGHchart, setDataGHchart] = useState<ContributionData[]>([]);
  const [dataLineChart, setDataLineChart] = useState<ChartDataPoint[]>([]); // ChartDataPoint array
  const [cumulativeChartData, setCumulativeChartData] = useState<CumulativeChartDataPoint[]>([]);


  useEffect(() => {
      const storedUser = localStorage.getItem("strava_user");

      if (storedUser) {
          try {
              const parsedUser = JSON.parse(storedUser);
              useAuthStore.setState({ isAuthenticated: true, user: parsedUser });
              console.log("User Authenticated from localStorage:", parsedUser);

              if (parsedUser && parsedUser.username && parsedUser.access_token) {
                fetchGHChartData(parsedUser.username, parsedUser.access_token)
                    .then(data => setDataGHchart(data)); // Use .then
    
                fetchActivitiesData(parsedUser.username, parsedUser.access_token)
                    .then(data => setDataLineChart(data)); // Use .then
                
                fetchCumulativeChartData(parsedUser.username, parsedUser.access_token, 3)
                    .then(data => setCumulativeChartData(data));
            }
          } catch (error) {
              console.error("Error parsing stored user:", error);
              localStorage.removeItem("strava_user");
              navigate('/login', { replace: true });
              return;
          }
      } else if (!isAuthenticated) {
          navigate('/login', { replace: true });
          return;
      }
  }, [navigate, isAuthenticated]);

  console.log(cumulativeChartData)

  return (
      <div className="flex flex-col h-full w-full"> {/* Parent container */}
          <div className="w-full mx-auto"> {/* GH Chart Container (Full Width) */}
              <ContributionGraph dataGHchart={dataGHchart} />
          </div>
          <div className="w-full mx-auto"> {/* Line Chart Container (Full Width) */}
              <ResponsiveContainer width="95%" height={400}>
                  <Linechart dataLineChart={dataLineChart} />
              </ResponsiveContainer>
          </div>
          <div className="w-full mx-auto h-[600px]"> {/* Line Chart Container (Full Width) */}
              <ResponsiveContainer width="95%" height={400}>
                  <CumulativeChart dataLineChart={cumulativeChartData} />
              </ResponsiveContainer>
          </div>
      </div>
  );
}

export default Home;


  