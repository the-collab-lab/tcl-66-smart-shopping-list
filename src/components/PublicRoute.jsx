import { Outlet } from 'react-router-dom';
import { useAuth } from '../api';
import { Landing } from '../views';

export function PublicRoute() {
	const { user } = useAuth();
	console.log(user);

	return !user ? <Landing /> : <Outlet />;
}
