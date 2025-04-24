import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import auth from '../../../utils/firebase/auth-firebase';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  onSubmit(formData: NgForm) {
    if (formData.valid) {
      const { email, password } = formData.value;
      auth.signIn(email, password);
    }
  }
}
