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

  sendData(
    endpoint: string,
    data: Record<string, any>,
    id?: string,
    cb?: () => void
  ) {
    const errorHandler = (error: any) => {
      console.log('Send data error: ', error.message);
      return {
        type: 'AppError',
        message: 'Send data error: ' + error.message,
        errorType: 'Network Error',
      } as AppError;
    };
    if (id) {
      set(ref(this.db, endpoint + '/' + id), data)
        .then(cb)
        .catch(errorHandler);
    } else {
      set(ref(this.db, endpoint), data).then(cb).catch(errorHandler);
    }
  }

  getData<T>(endpoint: string) {
    return get(child(this.dbRef, endpoint + '/'))
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
