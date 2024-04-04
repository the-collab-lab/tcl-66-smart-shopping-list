import { useEffect, useState } from 'react';
import { auth } from './config.js';
import {
	GoogleAuthProvider,
	getRedirectResult,
	signInWithPopup,
} from 'firebase/auth';
import { addUserToDatabase } from './firebase.js';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '../assets/GoogleIcon.jsx';
import { Spinner } from '../components/Spinner.jsx';

/**
 * A button that signs the user in using Google OAuth. When clicked,
 * the button redirects the user to the Google OAuth sign-in page.
 * After the user signs in, they are redirected back to the app.
 */

export const SignInButton = () => {
	const [loading, setLoading] = useState(false);
	const handleSignIn = async () => {
		try {
			setLoading(true);
			// Attempt sign-in with a popup
			await signInWithPopup(auth, new GoogleAuthProvider());
		} catch (error) {
			// If popup is blocked, fall back to redirect
			if (error.code === 'auth/popup-blocked') {
				try {
					// Trigger sign-in with redirect
					await getRedirectResult(auth);
				} catch (redirectError) {
					console.error('Error during redirect sign-in:', redirectError);
					// TODO ADD TOAST ONCE COMPONENT COMMITTED
				}
			} else {
				console.error('Error during popup sign-in:', error);
				// TODO ADD TOAST ONCE COMPONENT COMMITTED
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<button
			type="button"
			className="flex items-center h-[67px] py-2 rounded-md border-1 border-navBorder hover:bg-gray-100 justify-center w-full"
			aria-label="Sign up or Log in with google verification"
			onClick={handleSignIn}
		>
			{loading ? <Spinner /> : null}
			<GoogleIcon /> Verify with Google
		</button>
	);
};

/**
 * A button that signs the user out of the app using Firebase Auth.
 */
export const SignOutButton = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSignOut = async () => {
		try {
			setLoading(true);
			await auth.signOut();
			navigate('/');
		} catch (error) {
			console.error('Error signing out:', error);
			window.alert('Error signing out. Please try again.');
			// TODO ADD TOAST ONCE COMPONENT IS COMPLETE
		} finally {
			setLoading(false);
		}
	};

	return (
		<button
			type="button"
			className="flex items-center xsm:text-[12px] sm:text-[13px] md:text-[14px] px-2 py-1 border-1 rounded-lg hover:bg-hover"
			onClick={handleSignOut}
			aria-label="Sign Out"
		>
			{loading ? <Spinner /> : null}
			Sign Out
		</button>
	);
};

/**
 * A custom hook that listens for changes to the user's auth state.
 * Check out the Firebase docs for more info on auth listeners:
 * @see https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data
 */
export const useAuth = () => {
	const [user, setUser] = useState(null);
	const [isAuthenticating, setIsAuthenticating] = useState(true); // Add loading state

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setIsAuthenticating(false);
			setUser(user);
			if (user) {
				addUserToDatabase(user);
			}
		});
	}, []);

	return { user, isAuthenticating };
};

export const useAuth2 = () => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true); // Add loading state

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
			setIsLoading(false); // Set loading to false once authentication state is resolved
			if (user) {
				addUserToDatabase(user);
			}
		});

		return () => unsubscribe(); // Unsubscribe when component unmounts
	}, []);

	return { user, isLoading }; // Return loading state along with user object
};
