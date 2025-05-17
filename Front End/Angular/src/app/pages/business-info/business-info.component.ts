import { Component }       from '@angular/core';
import { RouterModule }    from '@angular/router';
import { FormsModule }     from '@angular/forms';
import { Router }          from '@angular/router';

@Component({
  selector: 'app-business-info',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.scss']
})
export class BusinessInfoComponent {
  constructor(private router: Router) {}

  onSubmit() {
    // After saving business info:
    this.router.navigate(['/pricing']);
  }
}
