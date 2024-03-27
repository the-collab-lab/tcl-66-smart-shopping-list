import React from 'react';
import { NavLink } from 'react-router-dom';
import { SignInButton, SignOutButton } from '../api/useAuth.jsx';
import { useAuth } from '../api/useAuth.jsx';
import Logo from '../assets/Logo.jsx';

export default function NavigationBar() {
	const { user } = useAuth();

	const sidebarWidth = 'xsm:min-w-24 sm:min-w-36 md:w-48 lg:w-64';
	const sidebarPadding = 'xsm:pt-4 sm:pt-4 md:p-4';
	const signInOutContainer = 'absolute xsm:pb-4 sm:pb-4 md:p-4 bottom-0 w-full';

	return (
		<nav
			className={`fixed ${sidebarWidth} bg-navBg border-b-1 border-r-1 border-navBorder min-h-screen`}
		>
			<div className={sidebarPadding}>
				<NavLink to="/" className="block px-4 py-1 rounded-md hover:bg-hover">
					<div className="invert-[85%]">
						<Logo />
					</div>
				</NavLink>
				<NavLink
					to="/list"
					className="block px-4 py-1 mt-2 rounded-md hover:bg-hover"
				>
					My Lists
				</NavLink>
			</div>
			<div className={signInOutContainer}>
				{user ? <SignOutButton /> : <SignInButton />}
			</div>
		</nav>
	);
}
