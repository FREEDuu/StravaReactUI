import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "./components/sidebar";

import { AppSidebar } from "./components/app-sidebar";
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';

  return (
    <SidebarProvider>
      <div className="flex w-full">
         {!isLoginRoute && <AppSidebar />}
        <main className={`${isLoginRoute ? 'w-full' : 'flex-1 p-4 ml-64'}`}>
          {/*{!isLoginRoute && <SidebarTrigger />} */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
          </Routes>
        </main>      
      </div>
    </SidebarProvider>
  );
}

export default App;