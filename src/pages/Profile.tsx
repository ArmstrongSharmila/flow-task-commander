
import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { LogOut, Mail, User } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  
  if (!user) {
    return null;
  }
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Profile</h1>
        
        <Card className="mb-6">
          <CardContent className="py-6">
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.picture} alt={user.name} />
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <div className="flex items-center justify-center sm:justify-start mt-2 text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{user.email}</span>
                </div>
                <p className="mt-4 text-gray-600">
                  Logged in with Google Account
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h3 className="font-medium">Sign Out</h3>
                <p className="text-sm text-gray-500">
                  Sign out from your current session
                </p>
              </div>
              <Button onClick={logout} variant="destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h3 className="font-medium">Google Account</h3>
                <p className="text-sm text-gray-500">
                  Manage your connected Google account
                </p>
              </div>
              <Button variant="outline" asChild>
                <a href="https://myaccount.google.com/" target="_blank" rel="noopener noreferrer">
                  Manage Account
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
