import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';

// Pages
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import Upload from '@/pages/Upload';
import Results from '@/pages/Results';
import History from '@/pages/History';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <TooltipProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes (Dashboard Layout) */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/history" element={<History />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster theme="dark" />
    </TooltipProvider>
  );
}

export default App;
