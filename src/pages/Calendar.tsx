
import React from 'react';
import Layout from '../components/Layout';
import { Card } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

const Calendar = () => {
  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">Calendar</h1>
        
        <Card className="p-6">
          <div className="flex justify-center">
            <CalendarComponent
              mode="single"
              className="rounded-md border shadow-sm"
            />
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Calendar functionality will be implemented in the next version.
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Calendar;
