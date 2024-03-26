import { NavLink } from 'react-router-dom';

export function Err() {
	return (
		<>
			<h1>Error Page</h1>
			<p>
				Sorry, the page you're looking for doesn't exist. Try{' '}
				<NavLink to="/">logging back in</NavLink>.
			</p>
		</>
	);
}
