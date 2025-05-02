import { EventEmitter, Injectable } from '@angular/core';
import auth from '../utils/firebase/auth-firebase';
import { isAppError } from '../utils/errors.model';
import { AppUser } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: AppUser | null = null;
  onUserUpd = new EventEmitter<AppUser | null>();

  constructor() {
    auth.getAuth.onAuthStateChanged((userCredentials) => {
      if (!userCredentials) {
        this.user = null;
      } else {
        this.user = {
          email: userCredentials.email!,
          uid: userCredentials.uid,
          accessToken: userCredentials.accessToken,
        };
      }

      this.onUserUpd.emit(this.user);
    });
  }

  async logIn(email: string, password: string) {
    const userCredentials = await auth.signIn(email, password);
    // console.log(userCredentials);

    if (!isAppError(userCredentials)) {
      this.user = {
        email: userCredentials.email!,
        uid: userCredentials.uid,
        accessToken: userCredentials.accessToken,
      };
    }
  }

  async logOut() {
    const result = await auth.logOut();
    if (!isAppError(result)) {
      this.user = null;
    }
  }
}
