import { getFirestore } from 'firebase/firestore';
import firebaseApp from './firebaseConfig';
import { getAuth } from 'firebase/auth';

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
