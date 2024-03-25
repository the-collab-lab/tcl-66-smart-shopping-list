import { useEffect, useState } from 'react';
import { auth } from './config.js';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { addUserToDatabase } from './firebase.js';
import { useTheme } from '../context/ThemeProvider.jsx';

export const SignInButton = () => {
	const { theme } = useTheme();

	return (
		<button
			type="button"
			className={`block px-4 py-2 rounded-md hover:bg-${theme === 'light' ? 'hover' : 'hoverDark'}`}
			onClick={() => signInWithRedirect(auth, new GoogleAuthProvider())}
		>
			Sign In
		</button>
	);
};

export const SignOutButton = () => {
	const { theme } = useTheme();

	return (
		<button
			type="button"
			className={`block px-4 py-2 rounded-md hover:bg-${theme === 'light' ? 'hover' : 'hoverDark'}`}
			onClick={() => auth.signOut()}
		>
			Sign Out
		</button>
	);
};

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
