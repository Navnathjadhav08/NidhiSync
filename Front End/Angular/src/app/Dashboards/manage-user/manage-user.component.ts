import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
  standalone:false
})
export class ManageUserComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = [];
  showTable = false;
  editing = false;
  showDeleteConfirmation = false;
  selectedUser: User | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userSvc: UserService
  ) {
    this.userForm = this.fb.group({
      id: [null],
      scno: ['', Validators.required],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialization code if needed
  }

  toggleTable(): void {
    this.showTable = !this.showTable;
    if (this.showTable) {
      this.loadUsers();
    }
  }

  loadUsers(): void {
    this.userSvc.getAll().subscribe(u => this.users = u);
  }

  save(): void {
    if (this.userForm.invalid) return;
    
    this.loading = true;
    const user: User = this.userForm.value;

    const operation = this.editing 
      ? this.userSvc.update(user) 
      : this.userSvc.create(user);

    operation.subscribe({
      next: () => {
        this.reset();
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Operation failed:', err);
        this.loading = false;
      }
    });
  }

  edit(user: User): void {
    this.editing = true;
    this.userForm.patchValue(user);
  }

  delete(user: User): void {
    this.selectedUser = user;
    this.showDeleteConfirmation = true;
  }

  confirmDelete(): void {
    if (this.selectedUser?.id) {
      this.userSvc.delete(this.selectedUser.id).subscribe({
        next: () => {
          this.loadUsers();
          this.showDeleteConfirmation = false;
        },
        error: (err: any) => console.error('Delete failed:', err)
      });
    }
  }

  cancelEdit(): void {
    this.editing = false;
    this.userForm.reset();
  }

  reset(): void {
    this.editing = false;
    this.userForm.reset();
    this.showTable = false;
  }
}