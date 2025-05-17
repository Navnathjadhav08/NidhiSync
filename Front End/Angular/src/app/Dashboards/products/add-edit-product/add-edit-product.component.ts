import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService,Product } from '../../../services/product-service.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
  standalone : false
})
export class AddEditProductComponent {
  product: Product;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService
  ) {
    this.isEditMode = data.mode === 'edit';
    this.product = this.isEditMode ? {...data.product} : {
      id: 0,
      barcode: '',
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      expDate: ''
    };
  }

  saveProduct(): void {
    if (this.isEditMode) {
      this.productsService.updateProduct(this.product).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.productsService.addProduct(this.product).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
