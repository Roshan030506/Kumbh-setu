import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfigJson) : getApp();

export const auth = getAuth(app);
// Use the specific firestoreDatabaseId from the provisioned config if available
export const db = getFirestore(app, firebaseConfigJson.firestoreDatabaseId || '(default)');

// Validate connection per Firebase guidelines
async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline status check:', error.message);
    }
  }
}
testFirestoreConnection();

export default app;
