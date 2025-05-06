
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TaskContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import TasksList from "./pages/TasksList";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Replace this with your actual Google OAuth Client ID
const clientId = "YOUR_GOOGLE_CLIENT_ID";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <TooltipProvider>
          <AuthProvider>
            <TaskProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/tasks" element={
                  <ProtectedRoute>
                    <TasksList />
                  </ProtectedRoute>
                } />
                <Route path="/tasks/new" element={
                  <ProtectedRoute>
                    <CreateTask />
                  </ProtectedRoute>
                } />
                <Route path="/tasks/:id/edit" element={
                  <ProtectedRoute>
                    <EditTask />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/calendar" element={
                  <ProtectedRoute>
                    <Calendar />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </TaskProvider>
          </AuthProvider>
        </TooltipProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);

export default App;
