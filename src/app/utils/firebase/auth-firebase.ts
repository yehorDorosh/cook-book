import { FirebaseApp } from 'firebase/app';
import appFirebaseFabric from './app-firebase';
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth,
} from 'firebase/auth';
import { AppError } from '../errors.model';

class AuthFirebase {
  private static instance: AuthFirebase;
  private auth: Auth;

  private constructor(private app: FirebaseApp) {
    // Private constructor to prevent direct instantiation
    this.auth = getAuth(app);

    this.auth.onAuthStateChanged((user) => {});
  }

  static getInstance(app: FirebaseApp): AuthFirebase {
    if (!AuthFirebase.instance) {
      AuthFirebase.instance = new AuthFirebase(app);
    }
    return AuthFirebase.instance;
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Successful login');
        return user;
      })
      .catch((error) => {
        console.error('Login error:', error.message);
        return {
          type: 'AppError',
          message: 'Login error: ' + error.message,
          errorType: 'Login Error',
        } as AppError;
      });
  }

  singUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Successful signUp: ', user);
      })
      .catch((error) => {
        console.error('SignUp Error:', error.message);
      });
  }

  logOut() {
    return signOut(this.auth)
      .then(() => {
        console.log('User is logout');
        return true;
      })
      .catch((error) => {
        console.error('LogOut error: ', error.message);
        return {
          type: 'AppError',
          message: 'LogOut error:' + error.message,
          errorType: 'LogOut Error',
        } as AppError;
      });
  }

  get getAuth() {
    return this.auth;
  }
}

const auth = AuthFirebase.getInstance(appFirebaseFabric.getApp);

export default auth;
