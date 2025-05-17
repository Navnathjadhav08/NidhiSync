// src/app/shared/models/user.model.ts

export interface User {
    id?: number;        // optional: json-server will generate this
    scno: string;
    fullName: string;
    address: string;
    phone: string;
    email: string;
    password: string;
  }
  