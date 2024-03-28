import { useEffect, useState } from 'react';
import { auth } from './config.js';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { addUserToDatabase } from './firebase.js';
import GoogleIcon from '../assets/GoogleIcon.jsx';

/**
 * A button that signs the user in using Google OAuth. When clicked,
 * the button redirects the user to the Google OAuth sign-in page.
 * After the user signs in, they are redirected back to the app.
 */
export const SignInButton = () => (
	<button
		type="button"
		className="flex items-center h-[67px] py-2 rounded-md border-1 border-navBorder hover:bg-gray-100 justify-center sm:px-[120px] md:px-48"
		onClick={() => signInWithRedirect(auth, new GoogleAuthProvider())}
	>
		<GoogleIcon /> Verify with Google
	</button>
);

/**
 * A button that signs the user out of the app using Firebase Auth.
 */
export const SignOutButton = () => (
	<button
		type="button"
		className="block px-4 py-2 rounded-md hover:bg-gray-100"
		onClick={() => auth.signOut()}
	>
		Sign Out
	</button>
);

/**
 * A custom hook that listens for changes to the user's auth state.
 * Check out the Firebase docs for more info on auth listeners:
 * @see https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data
 */
export const useAuth = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setUser(user);
			if (user) {
				addUserToDatabase(user);
			}
		});
	}, []);

	return { user };
};
