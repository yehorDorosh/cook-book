import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  constructor(private userSevice: UserService) {}

  onSubmit(formData: NgForm) {
    if (formData.valid) {
      const { email, password } = formData.value;
      this.userSevice.logIn(email, password);
    }
  }
}
