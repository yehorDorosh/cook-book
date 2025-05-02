import {
  Database,
  getDatabase,
  ref,
  set,
  get,
  child,
  DatabaseReference,
} from 'firebase/database';
import { AppError } from '../errors.model';

class DbFirebase {
  private static instance: DbFirebase;
  private db: Database;
  private dbRef: DatabaseReference;

  private constructor() {
    // Private constructor to prevent direct instantiation
    this.db = getDatabase();
    this.dbRef = ref(this.db);
  }

  static getInstance(): DbFirebase {
    if (!DbFirebase.instance) {
      DbFirebase.instance = new DbFirebase();
    }
    return DbFirebase.instance;
  }

  sendData() {
    set(ref(this.db, 'recipe/' + 'xxx1234'), {
      title: 'soup',
    });
  }

  getData<T>(endpoint: string) {
    return get(child(this.dbRef, endpoint))
      .then((snapshot) => {
        return snapshot.val() as T;
      })
      .catch((error) => {
        console.log('Get data error: ', error.message);
        return {
          type: 'AppError',
          message: 'Get data error: ' + error.message,
          errorType: 'Network Error',
        } as AppError;
      });
  }
}

const db = DbFirebase.getInstance();

export default db;
