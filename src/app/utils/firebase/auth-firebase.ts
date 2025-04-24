import { FirebaseApp } from 'firebase/app';
import appFirebaseFabric from './app-firebase';
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth,
} from 'firebase/auth';

class AuthFirebase {
  private static instance: AuthFirebase;
  private auth: Auth;

  private constructor(private app: FirebaseApp) {
    // Private constructor to prevent direct instantiation
    this.auth = getAuth(app);
  }

  static getInstance(app: FirebaseApp): AuthFirebase {
    if (!AuthFirebase.instance) {
      AuthFirebase.instance = new AuthFirebase(app);
    }
    return AuthFirebase.instance;
  }

  signIn(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Successful login', user);
      })
      .catch((error) => {
        console.error('Login error:', error.message);
      });
  }

  singUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Successful signUp:', user);
      })
      .catch((error) => {
        console.error('SignUp Error:', error.message);
      });
  }

  logOut() {
    signOut(this.auth)
      .then(() => {
        console.log('User is logout');
      })
      .catch((error) => {
        console.error('LogOut error:', error.message);
      });
  }
}

const auth = AuthFirebase.getInstance(appFirebaseFabric.getApp);

export default auth;
