import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ProductsService } from '../../services/product-service.service';
import { BillPreviewComponent } from '../bill-preview/bill-preview.component';
import { Bill } from '../../shared/models/bill.model';
interface Product {
  id: number;
  barcode: string;
  name: string;
  price: number;
  quantity: number;
}

interface BillItem {
  product: Product;
  quantity: number;
  total: number;
}

@Component({
  selector: 'app-generate-bill',
  templateUrl: './generate-bill.component.html',
  styleUrls: ['./generate-bill.component.scss'],
  standalone:false
})
export class GenerateBillComponent implements OnInit {
  customerForm: FormGroup;
  searchType: 'id' | 'barcode' | 'name' = 'name';
  searchQuery = '';
  searchTerms = new Subject<string>();
  
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedProducts: BillItem[] = [];
  paymentModes = ['Cash', 'Credit Card', 'UPI', 'Bank Transfer'];
  paymentStatuses = ['Paid', 'Pending'];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private productsService: ProductsService,
    private router: Router
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: [''],
      paymentMode: ['Cash', Validators.required],
      paymentStatus: ['Paid', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.setupSearch();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = [...products];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.isLoading = false;
      }
    });
  }

  setupSearch(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchQuery = term;
      this.performSearch(term);
    });
  }

  handleSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerms.next(input.value);
  }

  performSearch(query: string): void {
    if (!query) {
      this.filteredProducts = [...this.products];
      return;
    }

    const lowerQuery = query.toLowerCase();
    this.filteredProducts = this.products.filter(product => {
      switch (this.searchType) {
        case 'id': return product.id.toString().includes(lowerQuery);
        case 'barcode': return product.barcode.toLowerCase().includes(lowerQuery);
        case 'name': return product.name.toLowerCase().includes(lowerQuery);
        default: return false;
      }
    });
  }

  addToCart(product: Product): void {
    const existing = this.selectedProducts.find(p => p.product.id === product.id);
    if (existing) {
      existing.quantity++;
      existing.total = existing.quantity * product.price;
    } else {
      this.selectedProducts.push({
        product,
        quantity: 1,
        total: product.price
      });
    }
  }

  removeItem(index: number): void {
    this.selectedProducts.splice(index, 1);
  }

  adjustQuantity(item: BillItem, delta: number): void {
    item.quantity = Math.max(1, item.quantity + delta);
    item.total = item.quantity * item.product.price;
  }

  get totalAmount(): number {
    return this.selectedProducts.reduce((sum, item) => sum + item.total, 0);
  }

  generateBill(): void {
    if (this.customerForm.invalid || this.selectedProducts.length === 0) return;
  
    const billData: Bill = {
      customer: { ...this.customerForm.value },
      items: this.selectedProducts.map(item => ({
        product: {
          name: item.product.name,
          barcode: item.product.barcode,
          price: item.product.price
        },
        quantity: item.quantity,
        total: item.total
      })),
      total: this.totalAmount,
      paymentMode: this.customerForm.value.paymentMode,
      paymentStatus: this.customerForm.value.paymentStatus,
      billNumber: `BILL-${Date.now()}`,
      date: new Date(),
      shopInfo: {
        name: 'NidhiSync Store',
        address: '123 Main Street, Lalitpur',
        contact: '+977 9841XXXXXX',
        gstin: '07ABCDE1234F2Z5'
      }
    };
  
    console.log('Sending Bill Data:', billData); // Debug log
    this.dialog.open(BillPreviewComponent, { data: billData });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}