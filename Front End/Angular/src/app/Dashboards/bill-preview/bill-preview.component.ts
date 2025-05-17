import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'app-bill-preview',
  templateUrl: './bill-preview.component.html',
  styleUrls: ['./bill-preview.component.scss'],
  standalone:false
})
export class BillPreviewComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public bill: Bill,
    private http: HttpClient
  ) {}

  printBill(): void {
    window.print();
  }

  private generatePDF(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const element = document.getElementById('bill-content');
      if (!element) return reject('Element not found');
  
      // Add PDF export class
      element.classList.add('pdf-export');
  
      html2canvas(element).then(canvas => {
        const imgWidth = 208;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas, 'PNG', 0, 0, imgWidth, imgHeight);
        
        // Remove PDF export class after generation
        element.classList.remove('pdf-export');
        
        resolve(pdf.output('blob'));
      }).catch(err => {
        element.classList.remove('pdf-export');
        reject(err);
      });
    });
  }

  downloadPDF(): void {
    this.generatePDF().then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bill_${this.bill.billNumber}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  sendEmail(): void {
    this.generatePDF().then(pdfBlob => {
      const formData = new FormData();
      formData.append('billData', JSON.stringify(this.bill));
      formData.append('pdf', new File([pdfBlob], 
        `Invoice_${this.bill.billNumber}.pdf`, 
        { type: 'application/pdf' }
      ));
  
      this.http.post('http://localhost:5000/api/send-bill-email', formData)
        .subscribe({
          next: () => this.showSuccessAlert(),
          error: (err) => this.handleEmailError(err)
        });
    });
  }
  
  private showSuccessAlert(): void {
    // Implement your success notification
    alert('Email sent successfully!');
  }
  
  private handleEmailError(error: any): void {
    console.error('Email sending failed:', error);
    // Implement your error notification
    alert(`Email failed to send: ${error.message || 'Unknown error'}`);
  }
}