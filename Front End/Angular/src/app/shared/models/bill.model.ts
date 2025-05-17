export interface BillItem {
    product: {
      name: string;
      barcode: string;
      price: number;
    };
    quantity: number;
    total: number;
  }
  
  export interface Bill {
    customer: {
      name: string;
      email: string;
      mobile: string;
      address: string;
    };
    items: BillItem[];
    total: number;
    paymentMode: string;
    paymentStatus: string;
    billNumber: string;
    date: Date;
    shopInfo: {
      name: string;
      address: string;
      contact: string;
      gstin: string;
    };
  }