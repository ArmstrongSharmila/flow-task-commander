
import React from 'react';
import Layout from '../components/Layout';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Settings = () => {
  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Settings</h1>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="text-base font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm text-gray-500">
                  Receive email notifications for task assignments and updates
                </p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="browser-notifications" className="text-base font-medium">
                  Browser Notifications
                </Label>
                <p className="text-sm text-gray-500">
                  Receive browser notifications for task deadlines
                </p>
              </div>
              <Switch id="browser-notifications" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Display</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="compact-view" className="text-base font-medium">
                  Compact View
                </Label>
                <p className="text-sm text-gray-500">
                  Show more tasks in a condensed format
                </p>
              </div>
              <Switch id="compact-view" />
            </div>
          </div>
        </Card>
        
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
