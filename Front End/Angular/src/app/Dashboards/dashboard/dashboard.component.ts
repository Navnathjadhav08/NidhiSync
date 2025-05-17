import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  payments = [
    { name: 'Mithilesh K. Singh', amount: 'Rs. 3000', time: '30s ago' },
    { name: 'Suren Maharjan', amount: 'Rs. 800', time: '58s ago' },
    { name: 'Sandesh Bajracharya', amount: 'Rs. 5500', time: '2m ago' },
    { name: 'Subin Sedhai', amount: 'Rs. 1200', time: '5m ago' }
  ];

}
