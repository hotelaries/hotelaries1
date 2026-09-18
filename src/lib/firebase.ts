import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfigJson from '../../firebase-applet-config.json';

// Initialize Firebase App safely
export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfigJson);

// Firestore Database instance with specified databaseId
export const db = getFirestore(
  firebaseApp,
  firebaseConfigJson.firestoreDatabaseId || undefined
);

// Auth instance
export const auth = getAuth(firebaseApp);

// Test server connectivity on boot as per guidelines
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('[Firebase] Connected to Firestore database:', firebaseConfigJson.firestoreDatabaseId);
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[Firebase] Firestore client appears offline. Check network.');
      return false;
    }
    // Any permission or not-found error still confirms the connection reached the server
    return true;
  }
}
