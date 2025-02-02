import { Route, Routes } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "./components/sidebar";

import { AppSidebar } from "./components/app-sidebar";
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-4 ml-64">
          <SidebarTrigger />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>      
  </div>
    </SidebarProvider>
  );
}

export default App;