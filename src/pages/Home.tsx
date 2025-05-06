
import React from 'react';
import { Button } from '@/components/ui/button';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, login } = useAuth();

  const handleGoogleSuccess = (credentialResponse: any) => {
    // Decode the JWT token
    const token = credentialResponse.credential;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    const { name, email, picture } = JSON.parse(jsonPayload);
    login({ name, email, picture, token });
  };
  
  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side with content */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-purple mb-6">
            TaskFlow
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Manage your team's tasks efficiently
          </h2>
          <p className="text-gray-600 mb-8">
            Track tasks, assign responsibilities, and monitor progress all in one place. 
            Generate reports and stay on top of your team's productivity.
          </p>
          
          <div className="space-y-4">
            <div className="flex flex-col">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                auto_select
                context="signin"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side with image */}
      <div className="hidden md:flex md:w-1/2 bg-primary-purple bg-opacity-10 justify-center items-center p-8">
        <div className="max-w-lg">
          <img 
            src="https://illustrations.popsy.co/amber/project-management.svg" 
            alt="Task Management Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
