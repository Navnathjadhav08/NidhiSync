import { Component }       from '@angular/core';
import { RouterModule }    from '@angular/router';
import { FormsModule }     from '@angular/forms';
import { Router }          from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,             // ← this makes it standalone
  imports: [RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private router: Router) {}

  onSubmit() {
    // After registration logic:
    this.router.navigate(['/business']);
  }
}
