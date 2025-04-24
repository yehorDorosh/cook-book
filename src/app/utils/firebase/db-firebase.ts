import {
  Database,
  getDatabase,
  ref,
  set,
  get,
  child,
  DatabaseReference,
} from 'firebase/database';

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

  getData() {
    get(child(this.dbRef, 'recipe/')).then((snapshot) => {
      console.log(snapshot.val());
    });
  }
}

const db = DbFirebase.getInstance();

export default db;
