// src/app/pages/pricing/pricing.component.ts
import { Component }   from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';   // ← import CommonModule

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],                     // ← include it here
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  billingCycle: 'monthly' | 'yearly' = 'monthly';

  plans = [
    { id: 'free',    name: 'Free',    priceMonthly: 0,    priceYearly: 0 },
    { id: 'pro',     name: 'Pro',     priceMonthly: 300,  priceYearly: 3000 },
    { id: 'premium', name: 'Premium', priceMonthly: 600,  priceYearly: 6000 }
  ];

  selectedPlanId: string | null = null;

  setCycle(cycle: 'monthly' | 'yearly') {
    this.billingCycle = cycle;
  }
  constructor(private router: Router) {}

  choosePlan(planId: string) {
    this.selectedPlanId = planId;
    alert(`You selected the ${planId.toUpperCase()} plan (${this.billingCycle}).`);
    this.router.navigate(['/dashboard']);
  }
}
