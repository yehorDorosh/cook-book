import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import auth from '../../../utils/firebase/auth-firebase';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  onLogout() {
    auth.logOut();
  }
}
