
import React from 'react';
import { Button } from '@/components/ui/button';
import { Task } from '../contexts/TaskContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download } from 'lucide-react';
import { format } from 'date-fns';

interface PDFGeneratorProps {
  tasks: Task[];
  filters?: {
    search?: string;
    status?: string;
  };
}

const PDFGenerator = ({ tasks, filters }: PDFGeneratorProps) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(100, 100, 100);
    doc.text('Task Management Report', pageWidth / 2, 20, { align: 'center' });
    
    // Add subtitle with date
    doc.setFontSize(12);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated on ${format(new Date(), 'MMMM dd, yyyy')}`, pageWidth / 2, 28, { align: 'center' });
    
    // Filter information if any
    if (filters) {
      let filterText = 'Filters applied: ';
      if (filters.search) filterText += `Search: "${filters.search}" `;
      if (filters.status && filters.status !== 'all') filterText += `Status: ${filters.status}`;
      
      doc.setFontSize(10);
      doc.text(filterText, pageWidth / 2, 36, { align: 'center' });
    }
    
    // Format tasks for the table
    const tableData = tasks.map(task => [
      task.title,
      task.description.length > 60 ? task.description.substring(0, 60) + '...' : task.description,
      task.assignedTo,
      task.status,
      format(new Date(task.deadline), 'MMM dd, yyyy')
    ]);
    
    // Create the table
    autoTable(doc, {
      startY: 45,
      head: [['Title', 'Description', 'Assigned To', 'Status', 'Deadline']],
      body: tableData,
      headStyles: {
        fillColor: [155, 135, 245],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      styles: {
        fontSize: 10
      }
    });
    
    // Add footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `TaskFlow - Page ${i} of ${pageCount}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }
    
    // Save document
    doc.save(`task-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
  };
  
  return (
    <Button onClick={generatePDF} className="flex items-center">
      <Download className="mr-2 h-4 w-4" />
      Download PDF Report
    </Button>
  );
};

export default PDFGenerator;
