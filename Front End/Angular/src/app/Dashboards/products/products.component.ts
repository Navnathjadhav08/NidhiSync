import { Component, OnInit } from '@angular/core';
import { ProductsService,Product } from '../../services/product-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone : false
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      width: '500px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProducts();
    });
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      width: '500px',
      data: { mode: 'edit', product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProducts();
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.barcode.includes(this.searchTerm)
    );
  }
}
