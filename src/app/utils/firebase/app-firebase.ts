import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../../secure/firebase';

class AppFirebase {
  private static instance: AppFirebase | null = null;
  private app = initializeApp(firebaseConfig);

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  static getInstance(): AppFirebase {
    if (!AppFirebase.instance) {
      AppFirebase.instance = new AppFirebase();
    }
    return AppFirebase.instance;
  }

  get getApp() {
    return this.app;
  }
}

const appFirebaseFabric = AppFirebase.getInstance();

export default appFirebaseFabric;
