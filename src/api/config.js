import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyB3Gb5xwKYSc9FEeQujmfLe9YEf0_HA2cU',
	authDomain: 'tcl-66-smart-shopping-list.firebaseapp.com',
	projectId: 'tcl-66-smart-shopping-list',
	storageBucket: 'tcl-66-smart-shopping-list.appspot.com',
	messagingSenderId: '598060765664',
	appId: '1:598060765664:web:0eb160bba65181032f5b85',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
